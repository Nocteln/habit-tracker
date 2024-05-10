export const useUser = async () => {
  const tempUser = useAuth();
  const user = tempUser.user;
  const getUser = async () => {
    console.log(tempUser);
    let userr;
    try {
      const { data } = await useFetch(`/api/users/${user}`, {
        method: "POST",
        body: {
          user: tempUser.user,
        },
        lazy: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(data);
      userr = data.value;
    } catch (e) {
      console.log("error", e);
    }
    return {
      userr,
    };
  };

  return {
    getUser,
  };
};
