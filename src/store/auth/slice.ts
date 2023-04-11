import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { UserLoginType, UserRegisterType, UserType } from "../../types/UserType";

export type AuthStateType = {
	user: UserType | null;
	isAuthUser: boolean;
	isLoadingUser: boolean;
	hasErrorUser: boolean;
	errorMessage?: string;
	loginData: UserLoginType | null;
	registerData?: UserRegisterType | null;
};

const initialState: AuthStateType = {
	user: null,
	isAuthUser: false,
	isLoadingUser: false,
	hasErrorUser: false,
	loginData: null,
    registerData: null,
};

const NAME = "Auth";

const requestLogin: CaseReducer<AuthStateType> = (state) => {
	state.isLoadingUser = true;
	state.hasErrorUser = false;
};

const successLogin: CaseReducer<
	AuthStateType,
	PayloadAction<UserType>
> = (state, { payload }): any => {
	state.isLoadingUser = false;
	state.hasErrorUser = false;
	state.user = payload;
	state.isAuthUser = true;
	window.localStorage.setItem("userId", String(payload.id));
    window.localStorage.setItem("userName", String(payload.fullName));
};

const failureLogin: CaseReducer<
	AuthStateType,
	PayloadAction<string | undefined>
> = (state, { payload }) => {
	state.isLoadingUser = false;
	state.hasErrorUser = true;
	state.errorMessage = payload;
	state.isAuthUser = false;
};

const changeLoginData: CaseReducer<
	AuthStateType,
	PayloadAction<UserLoginType>
> = (state, payload) => {
	state.loginData = payload.payload;
};

const changeRegisterData: CaseReducer<
	AuthStateType,
	PayloadAction<UserRegisterType>
> = (state, payload) => {
	state.registerData = payload.payload;
};

const registerUser: CaseReducer<AuthStateType> = (state) => {
    state.isLoadingUser = true;
	state.hasErrorUser = false;
}

const logout: CaseReducer<AuthStateType> = (state) => {
	state.user = null;
	state.isAuthUser = false;
	state.loginData = null;
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
};

export const { actions: AuthActions, reducer: AuthReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestLogin,
		successLogin,
		failureLogin,
		changeLoginData,
		logout,
        changeRegisterData,
        registerUser
	},
});
