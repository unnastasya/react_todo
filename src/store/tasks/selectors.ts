import { ApplicationState } from "../../store";

export const TasksSelector = (state: ApplicationState) => state.tasks;

export const tasksArraySelector = (state: ApplicationState) => TasksSelector(state).tasks;
export const isLoadingTasksSelector = (state: ApplicationState) => TasksSelector(state).isLoadingTasks;
export const statusFilterSelector = (state: ApplicationState) => TasksSelector(state).statusFilter;
export const categoryFilterSelector = (state: ApplicationState) => TasksSelector(state).categoryFilter;
export const tasksCountSelector = (state: ApplicationState) => TasksSelector(state).tasksCount;
export const deleteTaskDataSelector = (state: ApplicationState) => TasksSelector(state).deleteTaskData;
export const addTaskDataSelector = (state: ApplicationState) => TasksSelector(state).addTaskData;

export const isOpenAddTaskModalSelector = (state: ApplicationState) => TasksSelector(state).isOpenAddTaskModal;
export const isOpenChangeTaskModalSelector = (state: ApplicationState) => TasksSelector(state).isOpenChangeTaskModal;
export const changeTaskDataSelector = (state: ApplicationState) => TasksSelector(state).changeTaskData;


