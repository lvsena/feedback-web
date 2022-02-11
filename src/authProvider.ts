import { AuthProvider } from "@pankod/refine";
import { AuthHelper } from "@pankod/refine-strapi";
import axios from "axios";

const strapiAuthProvider = (apiUrl: string) => {
  const axiosInstance = axios.create();

  const TOKEN_KEY =
    "3a1103f63204da75533c2ec3f8452f367bbceda1699a4365ac172f02caa498ff7c35d98922ffd682adbdf8094366f62e03bd9031c755e5b15923c87fbefa04486518317bc822c1e79c7ca614f7c1ef0bf779757d92488c24c57cb771c82f326f9f9ce1c10e7e6ddfc3ce028c562df491da760743e8e623b119817e5ef36ca1df";
  const strapiAuthHelper = AuthHelper(apiUrl);

  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      const { data, status } = await strapiAuthHelper.login(username, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${data.jwt}`,
        };

        return Promise.resolve;
      }
      return Promise.reject;
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axiosInstance.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        return Promise.resolve();
      }

      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return Promise.reject();
      }

      const { data, status } = await strapiAuthHelper.me(token);
      if (status === 200) {
        const { id, username, email } = data;
        return Promise.resolve({
          id,
          username,
          email,
        });
      }

      return Promise.reject();
    },
  };

  return {
    authProvider,
    axiosInstance,
  };
};

export default strapiAuthProvider;
