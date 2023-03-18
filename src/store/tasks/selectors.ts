import { ApplicationState } from "../../store";

export const TasksSelector = (state: ApplicationState) => state.tasks;

export const TSelector = (state: ApplicationState) => TasksSelector(state).tasks;
export const filterStatusSelector = (state: ApplicationState) => TasksSelector(state).filter;
export const categorySelector = (state: ApplicationState) => TasksSelector(state).findCategory;
export const categoriesSelector = (state: ApplicationState) => TasksSelector(state).categories;
export const tasksCountSelector = (state: ApplicationState) => TasksSelector(state).tasksCount;

