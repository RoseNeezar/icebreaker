import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import CustomRouter from "./app/utils/CustomRouter";
import GlobalStyles from "./styles/GlobalStyles";

export const useHistory = createBrowserHistory();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  },
});

const useMount = (
  el: ReactDOM.Container,
  routePrefix: string,
  useRemoteStore: any
) => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <GlobalStyles />
        <ToastContainer position="top-right" hideProgressBar />
        <CustomRouter history={useHistory}>
          <App routePrefix={routePrefix} useRemoteStore={useRemoteStore} />
        </CustomRouter>
      </QueryClientProvider>
    </React.StrictMode>,
    el
  );
};

const devRoot = document.querySelector("#_wheel-root");

if (devRoot) {
  useMount(devRoot, "app", null);
}

export { useMount };
