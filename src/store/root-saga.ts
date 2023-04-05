import { fork } from "redux-saga/effects";
import { watchLoginSaga } from "./auth/sagas";
import { watchgetAddCategorySaga, watchgetCategoriesSaga, watchgetDeleteCategorySaga } from "./categories/sagas";
import { watchAddTaskSaga, watchChangeCategoryTaskSaga, watchChangeFilterTaskSaga, watchDeleteTaskSaga, watchGetTasksSaga } from "./tasks/sagas";


export function* rootSaga() {
	yield fork(watchgetCategoriesSaga);
	yield fork(watchgetDeleteCategorySaga);
	yield fork(watchgetAddCategorySaga);
	yield fork(watchGetTasksSaga);
	yield fork(watchDeleteTaskSaga);
	yield fork(watchAddTaskSaga);
	yield fork(watchLoginSaga);
	yield fork(watchChangeFilterTaskSaga);
	yield fork(watchChangeCategoryTaskSaga);

}
