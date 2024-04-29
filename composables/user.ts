export const useUser = async () => {
  const tempUser = useAuth();
  console.log(tempUser);
  let user;
  try {
    const { data } = await useFetch(`/api/auth/${tempUser.user?.id}`, {
      method: "POST",
      body: {
        user: tempUser.user,
      },
      lazy: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    user = data.value;
  } catch (e) {
    console.log(e);
  }
  //   const { data } = await useAsyncData("user", () =>
  //     $fetch(`/api/auth/${tempUser.user?.id}`, {
  //       method: "POST",
  //       body: JSON.stringify(tempUser.user),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //   );
  console.log(user);

  return useState("foo", () => "cc");
};
