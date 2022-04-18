import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:3030/api";

axios.interceptors.request.use((config) => {
  // const token = store.commonStore.token;
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config;
});

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const { data, status, config, headers } = error.response!;
  switch (status) {
    case 400:
      if (data.error || data.errors) {
        console.log(data);
        if (data.message.includes("token")) return;
        toast.error(data.message);
      }
      break;
    case 401:
      if (
        status === 401 &&
        headers["www-authenticate"]?.startsWith('Bearer error="invalid_token"')
      ) {
        toast.error("Session expired - please login again");
      }
      break;
    case 500:
      toast.error(data.message);

      break;
  }
  return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params?: any) =>
    axios
      .get<T>(url, {
        params,
        withCredentials: true,
      })
      .then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios
      .put<T>(url, body, {
        withCredentials: true,
      })
      .then(responseBody),
  del: <T>(url: string) =>
    axios
      .delete<T>(url, {
        withCredentials: true,
      })
      .then(responseBody),
};

const Auth = {
  login: (data: any) => requests.post<any>(`/auth/login`, data),
  signup: (data: any) => requests.post<any>(`/auth/register`, data),
  getMe: () => requests.get<any>(`/auth/me`),
  logout: () => requests.post<any>(`/auth/logout`),
};

const agent = {
  Auth,
};

export default agent;
