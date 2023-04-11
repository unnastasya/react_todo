import React from "react";
import { useAppSelector } from "../../store";
import { categoriesArraySelector } from "../../store/categories";
import { CategoryType } from "../../types/CategoryType";
import { UserInfo } from "../UserInfo/UserInfo";
import { AddCategoryBlock } from "../AddCategoryBlock/AddCategoryBlock";

import "./CategoriesBlock.css";
import { Category } from "../Category/Category";

export function CategoriesBlock() {
	const allcategories: CategoryType[] = useAppSelector(
		categoriesArraySelector
	);

	return (
		<div className="categoriesBlock">
			<UserInfo />
			<AddCategoryBlock />
			{allcategories.map((category: CategoryType) => (
				<Category key={category.id} category={category} />
			))}
		</div>
	);
}
