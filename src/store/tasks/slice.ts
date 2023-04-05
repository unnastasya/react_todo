import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { TaskType } from "../../types/TaskType";

export type TasksStateType = {
	tasks: TaskType[];
	isLoadingTasks: boolean;
	hasErrorTasks: boolean;
	filter: string;
	findCategory: string;
	tasksCount: number;
	deleteTaskData?: any;
	addTaskData?: any;
};

const initialState: TasksStateType = {
	tasks: [],
	isLoadingTasks: false,
	hasErrorTasks: false,
	filter: "Все",
	findCategory: "Все",
	tasksCount: 0,
};

const NAME = "Tasks";

const requestTasks: CaseReducer<TasksStateType> = (state) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
};

const successTasks: CaseReducer<TasksStateType, PayloadAction<any[]>> = (
	state,
	{ payload }
): any => {
	state.isLoadingTasks = false;
	state.hasErrorTasks = false;
	state.tasks = payload;
	state.tasksCount = payload.length;
};

const failureTasks: CaseReducer<TasksStateType> = (state) => {
	state.isLoadingTasks = false;
	state.hasErrorTasks = true;
};

const addTask: CaseReducer<TasksStateType> = (state) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
};

const changeAddData: CaseReducer<TasksStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.addTaskData = payload;
};

const deleteTask: CaseReducer<TasksStateType> = (state) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
};

const changeDeleteData: CaseReducer<TasksStateType, PayloadAction<number>> = (
	state,
	{ payload }
) => {
	state.deleteTaskData = payload;
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
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.filter = payload;
};

const onlychangeFilter: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.filter = payload;
};

const changeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{payload}
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.findCategory = payload;
};

const onlychangeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.findCategory = payload;
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
		requestTasks,
		successTasks,
		failureTasks,
		changeDeleteData,
		changeAddData,
        onlychangeFilter,
        onlychangeCategory
	},
});
