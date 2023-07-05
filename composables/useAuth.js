import useFetchApi from "./useFetchApi.js";

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

        setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Get user when start website
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await useFetchApi("/api/auth/user");
        setUser(user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Get refresh token
        await refreshToken();
        // Get user
        await getUser();
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
    initAuth,
  };
};
