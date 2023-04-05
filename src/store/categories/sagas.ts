import { takeLatest, call, put, select } from "redux-saga/effects";
import { deleteCategories, getCategories, postCategories } from "../../api/categories";
import { AddDataSelector, DeleteDataSelector } from "./selectors";
import { CategoriesActions } from "./slice";

function* getCategoriesSaga() {
	try {
		const categories: any[] = yield call(
			getCategories
		);
		yield put(CategoriesActions.successCategories(categories));
	} catch (e: any) {
		yield put(CategoriesActions.failureCategories());
	}
}

function* addCategorySaga() {
    try {
        const requestData: {} = yield select(
			AddDataSelector
		);
        const dataAdd: {} =  yield call(postCategories, requestData);
        const categories: any[] = yield call(
			getCategories
		);
        yield put(CategoriesActions.successCategories(categories));
    } catch (error) {
        yield put(CategoriesActions.failureCategories());
    }
}

function* deleteCategorySaga() {
    try {
        const requestData: number = yield select(
			DeleteDataSelector
		);
        const dataDelete: {} =  yield call(deleteCategories, requestData);
        console.log(dataDelete)
        const categories: any[] = yield call(
			getCategories
		);
        yield put(CategoriesActions.successCategories(categories));
    } catch (error) {
        yield put(CategoriesActions.failureCategories());
    }
}

export function* watchgetCategoriesSaga() {
	yield takeLatest(
		CategoriesActions.requestCategories.type,
		getCategoriesSaga
	);
}

export function* watchgetAddCategorySaga() {
	yield takeLatest(
		CategoriesActions.addCategory.type,
		addCategorySaga
	);
}

export function* watchgetDeleteCategorySaga() {
	yield takeLatest(
		CategoriesActions.deleteCategory.type,
		deleteCategorySaga
	);
}