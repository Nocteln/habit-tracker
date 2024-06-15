import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { User } from "~/server/models/User";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();

const DiscordScopes = ["identify", "email"].join(" ");

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: "/login",
  },

  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: useRuntimeConfig().GoogleClientId,
      clientSecret: useRuntimeConfig().GoogleClientSecret,
      authorization: {
        params: {
          // prompt: "none",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },

      async profile(profile: GoogleProfile) {
        console.log("google");
        return {
          id: profile.sub, //id
          username: profile.name,
          name: profile.given_name,
          email: profile.email,
          image: profile.picture,
          provider: "google",
        };
      },
    }),

    // @ts-expect-error
    DiscordProvider.default({
      clientId: useRuntimeConfig().DiscordClientId,
      clientSecret: useRuntimeConfig().DiscordClientSecret,
      authorization: {
        params: {
          scope: DiscordScopes,
          prompt: "none",
          access_type: "offline",
          response_type: "code",
        },
      },

      async profile(profile: DiscordProfile) {
        return {
          id: profile.id, //id
          username: profile.global_name,
          name: profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}?size=1024`,
          provider: "discord",
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

      if (
        (account?.provider === "google" && !userExist) ||
        (account?.provider === "discord" && !userExist)
      ) {
        try {
          await $fetch(`${currentUrl}/api/user/create`, {
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
