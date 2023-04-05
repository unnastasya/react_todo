import { ApplicationState } from "../../store";

export const CategoriesSelector = (state: ApplicationState) => state.categories;

export const CategoriesArraySelector = (state: ApplicationState) => CategoriesSelector(state).categories;
export const DeleteDataSelector = (state: ApplicationState) => CategoriesSelector(state).deleteData;
export const AddDataSelector = (state: ApplicationState) => CategoriesSelector(state).addCategorydata;


