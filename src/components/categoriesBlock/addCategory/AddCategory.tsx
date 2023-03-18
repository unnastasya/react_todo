import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store";
import { TasksActions } from "../../../store/tasks";

import "./AddCategory.css"

export function AddCategory() {
    const dispatch = useAppDispatch();
	const [value, setValue] = useState("");


	const AddCategory = () => {
		dispatch(TasksActions.addCategory(value));
		setValue("");
	};
	return (
		<div>
			<Form.Control
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				type="text"
				placeholder="Введите категорию"
				className="input"
			/>
			<Button
				className="addTask__btn"
				onClick={AddCategory}
				variant="outline-secondary"
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
						fill-rule="evenodd"
						d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
					/>
				</svg>
			</Button>
		</div>
	);
}
