import { AxiosError } from "axios";
import { AppDispatch } from "..";
import http from "../../utils/http";
import { authActions } from "../slice/auth";

export interface LoginData {
  username: string;
  password: string;
}

export const login = (loginData: LoginData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.setLoading(true));
    try {
      localStorage.removeItem("ability");
      const { data, status } = await http.post("/auth/login", loginData);
      dispatch(authActions.setLoading(false));

      if (status === 200) {
        dispatch(authActions.setCredential(data.user));
      } else {
        dispatch(authActions.setError(data.message));
        dispatch(authActions.setLoading(false));
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(authActions.setError(err.response?.data.message));
        dispatch(authActions.setLoading(false));
      }
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.setLoading(true));
    localStorage.removeItem("ability");
    dispatch(authActions.removeCredential(null));
    dispatch(authActions.setLoading(false));
  };
};
