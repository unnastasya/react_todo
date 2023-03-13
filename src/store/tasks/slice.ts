import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { TaskType } from "../../types/TaskType";

export type TasksStateType = {
	tasks: TaskType[];
    filter: string;
    findCategory: string;
    categories: string[];
};

const initialState: TasksStateType = {
	tasks: [
		{
			id: 0,
			title: "Сходить в магазин",
			isActiveTask: true,
            category: "все задачи"
		},
		{
			id: 1,
			title: "Купить книгу",
			isActiveTask: true,
            category: "рабочие задачи"
		},
	],
    filter: "all",
    findCategory: "Все",
    categories: ["Все", "Рабочие"]
};

const NAME = "Tasks";

const addTask: CaseReducer<TasksStateType, PayloadAction<{title: string, category: string}>> = (
	state,
	payload
) => {
	state.tasks.unshift({
		id: Number(new Date()),
		title: payload.payload.title,
		isActiveTask: true,
        category: payload.payload.category,
	});
};

const deleteTask: CaseReducer<TasksStateType, PayloadAction<number>> = (
	state,
	payload
) => {
	for (let i = 0; i < state.tasks.length; i++) {
		if (state.tasks[i].id === payload.payload) state.tasks.splice(i, 1);
	}
	console.log("delete");
};

const changeStatusTask: CaseReducer<TasksStateType, PayloadAction<number>> = (
	state,
	payload
) => {
	for (let i = 0; i < state.tasks.length; i++) {
		if (state.tasks[i].id === payload.payload)
			state.tasks[i].isActiveTask = !state.tasks[i].isActiveTask;
	}
};

const changeFilter: CaseReducer<TasksStateType, PayloadAction<string>> = (state, payload) => {
    state.filter = payload.payload;
}

const changeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (state, payload) => {
    state.findCategory = payload.payload;
}

export const { actions: TasksActions, reducer: TasksReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		deleteTask,
		addTask,
        changeStatusTask, 
        changeFilter,
        changeCategory
	},
});
