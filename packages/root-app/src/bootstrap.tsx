import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import CustomRouter from "./app/utils/CustomRouter";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/globals.css";

export const useHistory = createBrowserHistory();

const colorScheme: ColorScheme = "dark";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <CustomRouter history={useHistory}>
          <App />
        </CustomRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
