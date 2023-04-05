import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer } from "@reduxjs/toolkit";

export type CategoriesStateType = {
	categories: any[];
	isLoadingCategories: boolean;
	hasErrorCategories: boolean;
	deleteData?: any;
    addCategorydata?: any;
};

const initialState: CategoriesStateType = {
	categories: [],
	isLoadingCategories: false,
	hasErrorCategories: false,
};

const NAME = "Categories";

const requestCategories: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
};

const successCategories: CaseReducer<
	CategoriesStateType,
	PayloadAction<any[]>
> = (state, { payload }): any => {
	state.isLoadingCategories = false;
	state.hasErrorCategories = false;
	state.categories = payload;
};

const failureCategories: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = false;
	state.hasErrorCategories = true;
};

const changeDeleteData: CaseReducer<CategoriesStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.deleteData = payload;
};

const deleteCategory: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
};

const changeAddData: CaseReducer<CategoriesStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.addCategorydata = payload;
};

const addCategory: CaseReducer<CategoriesStateType> = (state) => {
	state.isLoadingCategories = true;
	state.hasErrorCategories = false;
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
            addCategory
		},
	});
