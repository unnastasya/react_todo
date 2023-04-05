import { takeLatest, call, put, select } from "redux-saga/effects";
import { findUser } from "../../api/auth";
import {
	deleteCategories,
	getCategories,
	postCategories,
} from "../../api/categories";
import { LoginDataSelector } from "./selectors";
import { AuthActions } from "./slice";

function* loginSaga() {
	try {
		const requestData: {} = yield select(LoginDataSelector);
		const users: any[] = yield call(findUser, requestData);
		yield put(AuthActions.successLogin(users));
	} catch (e: any) {
		yield put(AuthActions.failureLogin());
	}
}

// function* registerSaga() {
// 	try {
// 		const requestData: number = yield select(DeleteDataSelector);
// 		const dataDelete: {} = yield call(deleteCategories, requestData);
// 		console.log(dataDelete);
// 		const categories: any[] = yield call(getCategories);
// 		yield put(CategoriesActions.successCategories(categories));
// 	} catch (error) {
// 		yield put(CategoriesActions.failureCategories());
// 	}
// }

export function* watchLoginSaga() {
	yield takeLatest(
		AuthActions.requestLogin.type,
		loginSaga
	);
}

// export function* watchgetAddCategorySaga() {
// 	yield takeLatest(CategoriesActions.addCategory.type, addCategorySaga);
// }
