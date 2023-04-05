import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCategories } from "../../api/categories";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	CategoriesActions,
	CategoriesArraySelector,
} from "../../store/categories";
import { categorySelector, TasksActions } from "../../store/tasks";
import { AddCategory } from "./addCategory/AddCategory";

import "./categoriesBlock.css";
import { Category } from "./category/Category";

export function CategoriesBlock() {
	const dispatch = useAppDispatch();
	const activeCategory = useAppSelector(categorySelector);
	const allcategories = useAppSelector(CategoriesArraySelector);

	const changeCategory = (str: string) => {
		dispatch(TasksActions.changeCategory(str));
	};

	useEffect(() => {
		dispatch(CategoriesActions.requestCategories());
	}, []);

	return (
		<div className="categories__conteiner">
			<AddCategory />
			{allcategories.map((category) => (
				<Category category={category} />
			))}
		</div>
	);
}
