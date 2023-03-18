import React, { useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { categoriesSelector, TasksActions } from "../../store/tasks";

import "./AddTaskButton.css";

export function AddTaskButton() {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState("");
    const [valueCategory, setValueCategory] = useState("все задачи");
	const allcategories = useAppSelector(categoriesSelector);


	const AddTask = () => {
		dispatch(TasksActions.addTask({ title: value, category: valueCategory }));
		setValue("");
	};

    const changeCategory = (e: any) => {
        setValueCategory(e.target.value)
    }

	return (
		<div className="addTask__container">
			<Form.Control
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				type="text"
				placeholder="Введите задачу"
				className="input"
			/>
			<Form.Select onChange={(e: any) => {changeCategory(e)}} className="category" aria-label="Default select example">
				{allcategories.map((category) => <option value={category}>{category}</option>)}
			</Form.Select>
			<Button
				className="addTask__btn"
				onClick={AddTask}
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