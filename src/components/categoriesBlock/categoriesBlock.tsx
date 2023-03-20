import React from "react";
import { Button} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	categoriesSelector,
	categorySelector,
	TasksActions,
} from "../../store/tasks";
import { AddCategory } from "./addCategory/AddCategory";

import "./categoriesBlock.css";

export function CategoriesBlock() {
	const dispatch = useAppDispatch();
	const activeCategory = useAppSelector(categorySelector);
	const allcategories = useAppSelector(categoriesSelector);

	const changeCategory = (str: string) => {
		dispatch(TasksActions.changeCategory(str));
	};

	const deleteCategory = (str: string) => {
		dispatch(TasksActions.deleteCategory(str));
	};
	return (
		<div className="categories__conteiner">
			<AddCategory />
			{allcategories.map((category) => (
				<div className="category__btns">
					<Button
						variant={
							category === activeCategory ? "primary" : "secondary"
						}
						className="categoriesBlock__btn"
						onClick={() => {
							changeCategory(category);
						}}
					>
						{category}
					</Button>
					{category !== "все задачи" && (
						<Button
							onClick={() => deleteCategory(category)}
							variant={
								category === activeCategory
									? "primary"
									: "secondary"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-dash"
								viewBox="0 0 16 16"
							>
								<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
							</svg>
						</Button>
					)}
				</div>
			))}
		</div>
	);
}
