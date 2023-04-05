import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postCategories } from "../../../api/categories";
import { useAppDispatch } from "../../../store";
import { CategoriesActions } from "../../../store/categories";
import { TasksActions } from "../../../store/tasks";

import "./AddCategory.css";

export function AddCategory() {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState("");

	const AddCategory = () => {
		const data = { text: value };
		dispatch(CategoriesActions.changeAddData(data));
		dispatch(CategoriesActions.addCategory());
	};

	return (
		<div className="addCategory_block">
			<Form.Control
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				type="text"
				placeholder="Добавить категорию"
				className="input"
			/>
			<Button
				className="addCategory_addTask__btn"
				onClick={AddCategory}
				variant="primary"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-plus-lg"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
					/>
				</svg>
			</Button>
		</div>
	);
}
