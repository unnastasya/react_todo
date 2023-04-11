import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CategoriesReducer } from "./categories";
import { TasksReducer } from "./tasks";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { AuthReducer } from "./auth";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
	reducer: {
		tasks: TasksReducer,
		categories: CategoriesReducer,
		auth: AuthReducer,
	},
	devTools: true,
	middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
	useSelector;
