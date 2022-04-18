import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import CustomRouter from "./app/utils/CustomRouter";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/globals.css";

export const useHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={useHistory}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
