import { AuthProvider, Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "styles/antd.less";
import { AuthHelper, DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "authProvider";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import axios from "axios";
import { UserList } from "pages/users/listUsers";
import { PositionList } from "pages/positions/listPositions";
import { Login } from "pages/login";

export const TOKEN_KEY =
  "3a1103f63204da75533c2ec3f8452f367bbceda1699a4365ac172f02caa498ff7c35d98922ffd682adbdf8094366f62e03bd9031c755e5b15923c87fbefa04486518317bc822c1e79c7ca614f7c1ef0bf779757d92488c24c57cb771c82f326f9f9ce1c10e7e6ddfc3ce028c562df491da760743e8e623b119817e5ef36ca1df";
export const API_URL = "http://localhost:1337";

const App: React.FC = () => {
  const axiosInstance = axios.create();
  const strapiAuthHelper = AuthHelper(API_URL + "/api");

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

  return (
    <Refine
      authProvider={authProvider}
      dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
      routerProvider={routerProvider}
      Title={Title}
      Header={Header}
      OffLayoutArea={OffLayoutArea}
      Footer={Footer}
      Layout={Layout}
      Sider={Sider}
      LoginPage={Login}
      resources={[
        {
          name: "users",
          list: UserList,
          options: { label: "Colaboradores" },
        },
        {
          name: "positions",
          list: PositionList,
          options: { label: "Cargos" },
        },
        {
          name: "valors",
          list: PositionList,
          options: { label: "Valores" },
        },
        {
          name: "avaliacaos",
          list: PositionList,
          options: { label: "Avaliações" },
        },
      ]}
    />
  );
};

export default App;
