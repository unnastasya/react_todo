import { ApplicationState } from "../../store";

export const TasksSelector = (state: ApplicationState) => state.tasks;

export const TasksArraySelector = (state: ApplicationState) => TasksSelector(state).tasks;
export const filterStatusSelector = (state: ApplicationState) => TasksSelector(state).filter;
export const categorySelector = (state: ApplicationState) => TasksSelector(state).findCategory;
export const tasksCountSelector = (state: ApplicationState) => TasksSelector(state).tasksCount;
export const deleteTaskDataSelector = (state: ApplicationState) => TasksSelector(state).deleteTaskData;
export const addTaskDataSelector = (state: ApplicationState) => TasksSelector(state).addTaskData;

