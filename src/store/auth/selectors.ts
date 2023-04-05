import { ApplicationState } from "..";

export const AuthSelector = (state: ApplicationState) => state.auth;

export const UserSelector = (state: ApplicationState) => AuthSelector(state).user;
export const LoginDataSelector = (state: ApplicationState) => AuthSelector(state).loginData;
export const RegisterDataSelector = (state: ApplicationState) => AuthSelector(state).registerData;


