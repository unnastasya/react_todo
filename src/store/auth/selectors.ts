import { ApplicationState } from "..";

export const AuthSelector = (state: ApplicationState) => state.auth;

export const UserSelector = (state: ApplicationState) => AuthSelector(state).user;
export const IsAuthUserSelector = (state: ApplicationState) => AuthSelector(state).isAuthUser;
export const LoginDataSelector = (state: ApplicationState) => AuthSelector(state).loginData;
export const RegisterDataSelector = (state: ApplicationState) => AuthSelector(state).registerData;
export const ErrorMessageDataSelector = (state: ApplicationState) => AuthSelector(state).errorMessage;


