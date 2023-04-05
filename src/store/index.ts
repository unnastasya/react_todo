import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CategoriesActions, CategoriesReducer } from "./categories";
import { TasksReducer } from "./tasks";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { AuthReducer } from "./auth";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]

// export const store = configureStore({
//     reducer: {
//         tasks: TasksReducer,
//         categories: CategoriesReducer,
//     },
//     devTools: true,
//     middleware: middlewares,
// })

// sagaMiddleware.run(rootSaga);


const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	tasks: TasksReducer,
	categories: CategoriesReducer,
	auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
	useSelector;
