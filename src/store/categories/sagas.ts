import { takeLatest, call, put, select } from "redux-saga/effects";
import {
	deleteCategories,
	getCategories,
	postCategories,
} from "../../api/categories";
import { deleteTask, getTasks } from "../../api/tasks";
import { CategoryType } from "../../types/CategoryType";
import { TaskType } from "../../types/TaskType";
import {
	categoryFilterSelector,
	TasksActions,
} from "../tasks";
import {
	addCategoryDataSelector,
	deleteCategoryDataSelector,
} from "./selectors";
import { CategoriesActions } from "./slice";

function* getCategoriesSaga() {
	try {
		const categories: CategoryType[] = yield call(getCategories);

		yield put(CategoriesActions.successCategories(categories));
	} catch (e: any) {
		yield put(CategoriesActions.failureCategories());
	}
}

function* addCategorySaga() {
	try {
		const requestData: {} = yield select(addCategoryDataSelector);
		yield call(postCategories, requestData);
		const categories: CategoryType[] = yield call(getCategories);

		yield put(CategoriesActions.successCategories(categories));
	} catch (error) {
		yield put(CategoriesActions.failureCategories());
	}
}

function* deleteCategorySaga() {
	try {
		const requestData: { id: number; name: string } = yield select(
			deleteCategoryDataSelector
		);
		yield call(deleteCategories, requestData);
		const categories: CategoryType[] = yield call(getCategories);

		const categoryData = requestData.name;
		let statusData = "Все";
		const data = { status: statusData, category: categoryData };
		const tasksForDelete: TaskType[] = yield call(getTasks, data);
		const deletedArray = [];
		for (let i in tasksForDelete) {
			if (tasksForDelete[i].category === categoryData) {
				deletedArray.push(tasksForDelete[i].id);
			}
		}

		for (let i of deletedArray) {
			yield call(deleteTask, i);
		}

		const statusData2: string = "Все";
		const categoryData2: string = yield select(categoryFilterSelector);
		const data2 = { status: statusData2, category: categoryData2 };

		const tasks: TaskType[] = yield call(getTasks, data2);

		yield put(CategoriesActions.successCategories(categories));
		yield put(TasksActions.successTasks(tasks));
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
	yield takeLatest(CategoriesActions.addCategory.type, addCategorySaga);
}

export function* watchgetDeleteCategorySaga() {
	yield takeLatest(CategoriesActions.deleteCategory.type, deleteCategorySaga);
}
