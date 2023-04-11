import { ApplicationState } from "../../store";

export const CategoriesSelector = (state: ApplicationState) => state.categories;

export const categoriesArraySelector = (state: ApplicationState) => CategoriesSelector(state).categories;
export const deleteCategoryDataSelector = (state: ApplicationState) => CategoriesSelector(state).deleteCategoryData;
export const addCategoryDataSelector = (state: ApplicationState) => CategoriesSelector(state).addCategoryData;

export const isOpenCategoriesModal = (state: ApplicationState) => CategoriesSelector(state).isOpenCategoriesModal;
