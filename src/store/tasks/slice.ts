import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { TaskType } from "../../types/TaskType";

export type TasksStateType = {
	tasks: TaskType[];
	tasksCount: number;
	isLoadingTasks: boolean;
	hasErrorTasks: boolean;
	statusFilter: string;
	categoryFilter: string;
	deleteTaskData?: number;
	addTaskData?: TaskType;

	isOpenAddTaskModal: boolean;
	isOpenChangeTaskModal: boolean;
	changeTaskData?: any;
};

const initialState: TasksStateType = {
	tasks: [],
	isLoadingTasks: false,
	hasErrorTasks: false,
	statusFilter: "Все",
	categoryFilter: "Все",
	tasksCount: 0,

	isOpenAddTaskModal: false,
	isOpenChangeTaskModal: false,
	changeTaskData: {},

};

const NAME = "Tasks";

const requestTasks: CaseReducer<TasksStateType> = (state) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
};

const successTasks: CaseReducer<TasksStateType, PayloadAction<TaskType[]>> = (
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

const changeAddData: CaseReducer<TasksStateType, PayloadAction<TaskType>> = (
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
	state.statusFilter = payload;
};

const onlychangeFilter: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.statusFilter = payload;
};

const changeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.categoryFilter = payload;
};

const onlychangeCategory: CaseReducer<TasksStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingTasks = true;
	state.hasErrorTasks = false;
	state.categoryFilter = payload;
};

const openAddTaskModal: CaseReducer<TasksStateType> = (state) => {
	state.isOpenAddTaskModal = true;
};

const closeAddTaskModal: CaseReducer<TasksStateType> = (state) => {
	state.isOpenAddTaskModal = false;
};

const openChangeTaskModal: CaseReducer<
	TasksStateType,
	PayloadAction<TaskType>
> = (state, { payload }) => {
	state.isOpenChangeTaskModal = true;
	state.changeTaskData = payload;
};

const closeChangeTaskModal: CaseReducer<TasksStateType> = (state) => {
	state.isOpenChangeTaskModal = false;
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
		onlychangeCategory,
		openAddTaskModal,
		closeAddTaskModal,
		openChangeTaskModal,
		closeChangeTaskModal,
	},
});
