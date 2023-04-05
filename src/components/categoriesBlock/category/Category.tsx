import React from "react";
import { Button } from "react-bootstrap";
import { deleteCategories } from "../../../api/categories";
import { useAppDispatch, useAppSelector } from "../../../store";
import { CategoriesActions } from "../../../store/categories";
import { categorySelector, TasksActions } from "../../../store/tasks";
import "./Category.css";

export function Category({ category }: any) {
	console.log("category", category);
	const dispatch = useAppDispatch();
	const activeCategory = useAppSelector(categorySelector);

	const changeCategory = () => {
		if (category.text === "Все") {
			console.log("ALL");

			dispatch(TasksActions.changeCategory("Все"));
		} else {
			console.log("NOT ALL");

			dispatch(TasksActions.changeCategory(category.text));
		}
	};

	const deleteCategory = (e: any) => {
		dispatch(CategoriesActions.changeDeleteData(e.currentTarget.id));
		dispatch(CategoriesActions.deleteCategory());
	};
	return (
		<div className="category__btns">
			<Button
				variant={
					category.text === activeCategory ? "primary" : "secondary"
				}
				className="categoriesBlock__btn"
				onClick={changeCategory}
			>
				{category.text}
			</Button>
			{category.text !== "Все" && (
				<Button
					id={category.id}
					onClick={(e) => deleteCategory(e)}
					variant={
						category.text === activeCategory
							? "primary"
							: "secondary"
					}
					className="categoriesBlock__Addbtn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-trash"
						viewBox="0 0 16 16"
					>
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
						<path
							fillRule="evenodd"
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
						/>
					</svg>
				</Button>
			)}
		</div>
	);
}
