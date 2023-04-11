import { takeLatest, call, put, select } from "redux-saga/effects";
import { addUser, findUser } from "../../api/auth";
import {
	UserLoginType,
	UserRegisterType,
	UserType,
} from "../../types/UserType";
import { LoginDataSelector, RegisterDataSelector } from "./selectors";
import { AuthActions } from "./slice";

function* loginSaga() {
	try {
		const requestData: UserLoginType = yield select(LoginDataSelector);
		const users: UserType = yield call(findUser, requestData);
		if (!users) {
			yield put(AuthActions.failureLogin("Пользователь не найден"));
			return;
		}
		if (users.password !== requestData.password) {
			yield put(AuthActions.failureLogin("Неверный логин или пароль"));
			return;
		}
		yield put(AuthActions.successLogin(users));
	} catch (e: any) {
		yield put(AuthActions.failureLogin());
	}
}

function* registerSaga() {
	try {
		const requestData: UserRegisterType = yield select(
			RegisterDataSelector
		);
		const users: UserType = yield call(addUser, requestData);
		yield put(AuthActions.successLogin(users));
	} catch (error) {
		yield put(AuthActions.failureLogin());
	}
}

export function* watchLoginSaga() {
	yield takeLatest(AuthActions.requestLogin.type, loginSaga);
}

export function* watchgetRegisterSaga() {
	yield takeLatest(AuthActions.registerUser.type, registerSaga);
}
