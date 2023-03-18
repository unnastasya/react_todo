import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { TaskType } from "../../types/TaskType";

export type TasksStateType = {
	tasks: TaskType[];
	filter: string;
	findCategory: string;
	categories: string[];
	tasksCount: number;
};

const initialState: TasksStateType = {
	tasks: [],
	filter: "all",
	findCategory: "Все",
	categories: ["все задачи", "рабочие задачи"],
	tasksCount: 0,
};

const NAME = "Tasks";

const addTask: CaseReducer<
	TasksStateType,
	PayloadAction<{ title: string; category: string }>
> = (state, payload) => {
	state.tasks.unshift({
		id: Number(new Date()),
		title: payload.payload.title,
		isActiveTask: true,
		category: payload.payload.category,
	});
	state.tasksCount++;
};

const deleteTask: CaseReducer<TasksStateType, PayloadAction<number>> = (
	state,
	payload
) => {
	for (let i = 0; i < state.tasks.length; i++) {
		if (state.tasks[i].id === payload.payload) state.tasks.splice(i, 1);
	}
	state.tasksCount--;
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

const changeFilter: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	payload
) => {
	state.filter = payload.payload;
};

const changeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	payload
) => {
	state.findCategory = payload.payload;
};

const addCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	payload
) => {
	state.categories.push(payload.payload);
};

const deleteCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	payload
) => {
	const index = state.categories.indexOf(payload.payload);
	state.categories.splice(index, 1);
	for (let i = 0; i < state.tasks.length; i++) {
		if (state.tasks[i].category === payload.payload) {
			state.tasks.splice(i, 1);
			i--;
		}
	}
	state.findCategory = "все задачи";
};
export const { actions: TasksActions, reducer: TasksReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		deleteTask,
		addTask,
		changeStatusTask,
		changeFilter,
		changeCategory,
		addCategory,
		deleteCategory,
	},
});
