import React from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { CategoriesActions } from "../../store/categories";
import { categoryFilterSelector, TasksActions } from "../../store/tasks";
import { CategoryType } from "../../types/CategoryType";
import "./Category.css";

interface CategoryProps {
	category: CategoryType;
}

export function Category({ category }: CategoryProps) {
	const dispatch = useAppDispatch();
	const activeCategory: string = useAppSelector(categoryFilterSelector);

	const changeCategory = () => {
		if (category.text === "Все") {
			dispatch(TasksActions.changeCategory("Все"));
		} else {
			dispatch(TasksActions.changeCategory(category.text));
		}
        closeCategoryModal()
	};

    const closeCategoryModal = () => {
        dispatch(CategoriesActions.closeCategoriesModal())
    }

	const deleteCategory = (e: any) => {
		dispatch(
			CategoriesActions.changeDeleteData({
				id: e.currentTarget.id,
				name: e.currentTarget.name,
			})
		);
		dispatch(CategoriesActions.deleteCategory());
		if (activeCategory === e.currentTarget.name) {
			dispatch(TasksActions.changeCategory("Все"));
		}
	};

	return (
		<div className="category__buttonsBlock">
			<Button
				variant={
					category.text === activeCategory ? "primary" : "secondary"
				}
				className="category__button"
				onClick={changeCategory}
			>
				{category.text}
			</Button>
			{category.text !== "Все" && (
				<Button
					id={String(category.id)}
					name={category.text}
					onClick={(e) => deleteCategory(e)}
					variant={
						category.text === activeCategory
							? "primary"
							: "secondary"
					}
					className="category__deleteButton"
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
