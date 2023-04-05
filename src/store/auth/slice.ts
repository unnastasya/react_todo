import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";

export type AuthStateType = {
	user: any;
	isLoadingUser: boolean;
	hasErrorUser: boolean;
	errorMessage?: string;
	loginData?: any;
	registerData?: any;
};

const initialState: AuthStateType = {
	user: [],
	isLoadingUser: false,
	hasErrorUser: false,
};

const NAME = "Auth";

const requestLogin: CaseReducer<AuthStateType> = (state) => {
	state.isLoadingUser = true;
	state.hasErrorUser = false;
};

const successLogin: CaseReducer<AuthStateType, PayloadAction<any>> = (
	state,
	{ payload }
): any => {
	state.isLoadingUser = false;
	state.hasErrorUser = false;
	state.user = payload;
};

const failureLogin: CaseReducer<AuthStateType> = (state) => {
	state.isLoadingUser = false;
	state.hasErrorUser = true;
};

export const { actions: AuthActions, reducer: AuthReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestLogin,
		successLogin,
		failureLogin,
	},
});
