import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";
import { AddCategoryType, CategoryType } from "../../types/CategoryType";

export type CategoriesStateType = {
	categories: CategoryType[];
	isLoadingCategories: boolean;
	hasErrorCategories: boolean;
	deleteCategoryData?: { id: number; name: string };
	addCategoryData?: AddCategoryType;

	isOpenCategoriesModal: boolean;
};

const initialState: CategoriesStateType = {
	categories: [],
	isLoadingCategories: false,
	hasErrorCategories: false,

	isOpenCategoriesModal: false,
};

const NAME = "Categories";

const requestCategories: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
};

const successCategories: CaseReducer<
	CategoriesStateType,
	PayloadAction<CategoryType[]>
> = (state, { payload }): any => {
	state.isLoadingCategories = false;
	state.hasErrorCategories = false;
	state.categories = payload;
};

const failureCategories: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = false;
	state.hasErrorCategories = true;
};

const changeDeleteData: CaseReducer<
	CategoriesStateType,
	PayloadAction<{ id: number; name: string }>
> = (state, { payload }) => {
	state.deleteCategoryData = payload;
};

const deleteCategory: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
};

const changeAddData: CaseReducer<
	CategoriesStateType,
	PayloadAction<AddCategoryType>
> = (state, { payload }) => {
	state.addCategoryData = payload;
};

const addCategory: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
};

const openCategoriesModal: CaseReducer<CategoriesStateType> = (state) => {
	state.isOpenCategoriesModal = true;
};

const closeCategoriesModal: CaseReducer<CategoriesStateType> = (state) => {
	state.isOpenCategoriesModal = false;
};

export const { actions: CategoriesActions, reducer: CategoriesReducer } =
	createSlice({
		name: NAME,
		initialState: initialState,
		reducers: {
			requestCategories,
			successCategories,
			failureCategories,
			changeDeleteData,
			deleteCategory,
			changeAddData,
			addCategory,
			openCategoriesModal,
			closeCategoriesModal,
		},
	});
