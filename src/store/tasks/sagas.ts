import { takeLatest, call, put, select } from "redux-saga/effects";
import { deleteTask, getTasks, postTask } from "../../api/tasks";
import {
	addTaskDataSelector,
	categorySelector,
	deleteTaskDataSelector,
	filterStatusSelector,
} from "./selectors";
import { TasksActions } from "./slice";

function* getTasksSaga() {
	try {
		const statusData: string = yield select(filterStatusSelector);
		const categoryData: string = yield select(categorySelector);
		const data = { status: statusData, category: categoryData };
		const tasks: any[] = yield call(getTasks, data);
		console.log("TASKS", tasks);

		yield put(TasksActions.successTasks(tasks));
	} catch (e: any) {
		yield put(TasksActions.failureTasks());
	}
}

function* deleteTaskSaga() {
	try {
		const requestData: number = yield select(deleteTaskDataSelector);
		const statusData: string = yield select(filterStatusSelector);
		const categoryData: string = yield select(categorySelector);
		const data = { status: statusData, category: categoryData };
		yield call(deleteTask, requestData);
		const tasks: any[] = yield call(getTasks, data);
		yield put(TasksActions.successTasks(tasks));
	} catch (error) {
		yield put(TasksActions.failureTasks());
	}
}

function* addTaskSaga() {
	try {
		const requestData: number = yield select(addTaskDataSelector);
		const statusData: string = yield select(filterStatusSelector);
		const categoryData: string = yield select(categorySelector);
		const data = { status: statusData, category: categoryData };

		yield call(postTask, requestData);
		const tasks: any[] = yield call(getTasks, data);

		yield put(TasksActions.successTasks(tasks));
	} catch (error) {
		yield put(TasksActions.failureTasks());
	}
}

function* changeFilterTaskSaga() {
	try {
		const statusData: string = yield select(filterStatusSelector);
		const categoryData: string = yield select(categorySelector);
		const data = { status: statusData, category: categoryData };
		console.log("data", data);
		const tasks: any[] = yield call(getTasks, data);
		console.log("TASKS", tasks);
		yield put(TasksActions.successTasks(tasks));
	} catch (error) {
		yield put(TasksActions.failureTasks());
	}
}

function* changeCategoryTaskSaga() {
	try {
		const statusData: string = yield select(filterStatusSelector);
		const categoryData: string = yield select(categorySelector);
		const data = { status: statusData, category: categoryData };
		console.log("data", data);

		const tasks: any[] = yield call(getTasks, data);
		console.log("TASKS", tasks);
		yield put(TasksActions.successTasks(tasks));
	} catch (error) {
		yield put(TasksActions.failureTasks());
	}
}

export function* watchGetTasksSaga() {
	yield takeLatest(TasksActions.requestTasks.type, getTasksSaga);
}

export function* watchDeleteTaskSaga() {
	yield takeLatest(TasksActions.deleteTask.type, deleteTaskSaga);
}

export function* watchAddTaskSaga() {
	yield takeLatest(TasksActions.addTask.type, addTaskSaga);
}

export function* watchChangeFilterTaskSaga() {
	yield takeLatest(TasksActions.changeFilter.type, changeFilterTaskSaga);
}

export function* watchChangeCategoryTaskSaga() {
	yield takeLatest(TasksActions.changeCategory.type, changeCategoryTaskSaga);
}
