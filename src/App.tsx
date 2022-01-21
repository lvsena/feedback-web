import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "styles/antd.less";
import { DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "authProvider";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";

function App() {
  const API_URL = "your-strapi-api-url";

  const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL, axiosInstance);
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    ></Refine>
  );
}

export default App;
