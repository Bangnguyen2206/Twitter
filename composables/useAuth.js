export default () => {
  // Descriptions
  // ref, reactive: khởi tạo dữ liệu => useState
  const useAuthToken = () => useState("auth_token", () => "");
  const useAuthUser = () => useState("auth_user", () => "123");

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
    return authToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
    return authUser;
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        // setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    login,
    useAuthUser,
    useAuthToken,
  };
};
