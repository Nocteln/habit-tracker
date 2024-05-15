import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { User } from "~/server/models/User";
import bcrypt from "bcrypt";
import { navigateTo, useFetch } from "nuxt/app";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: "/signin",
  },

  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { username: string; password: string }) {
        // TODO: Fetch user from database

        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
          });
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
          });
        }

        return {
          ...user.toObject(),
          password: undefined,
        };
      },
    }),

    // @ts-expect-error
    GoogleProvider.default({
      clientId: useRuntimeConfig().GoogleClientId,
      clientSecret: useRuntimeConfig().GoogleClientSecret,
      authorization: {
        params: {
          prompt: "none",
          access_type: "offline",
          response_type: "code",
        },
      },

      async profile(profile: GoogleProfile) {
        console.log("cc", profile);
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };

      return session;
    },

    async signIn({ user, account }) {
      const currentUrl = useRuntimeConfig().CurrentUrl;

      const userExist = await User.findOne({ id: user.id });

      if (account?.provider === "google" && !userExist) {
        try {
          await fetch(`${currentUrl}/api/user/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
        } catch (e) {
          console.log(e);
        }
      }
      return user;
    },
  },
});
