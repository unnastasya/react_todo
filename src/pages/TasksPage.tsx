import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getTasks } from "../api/tasks";
import { AddTaskButton } from "../components/buttons/AddTaskButton";
import { CategoriesBlock } from "../components/categoriesBlock/categoriesBlock";
import { FilterBlock } from "../components/filterBlock/filterBlock";
import { Info } from "../components/info/info";
import { TasksBlock } from "../components/tasksBlock/tasksBlock";
import { useAppDispatch, useAppSelector } from "../store";
import {
	categorySelector,
	filterStatusSelector,
	TasksActions,
	TasksArraySelector,
	tasksCountSelector,
} from "../store/tasks";

import "./TasksPage.css";

export function TasksPage() {
	const dispatch = useAppDispatch();
	const filterStatus: string = useAppSelector(filterStatusSelector);
	const tasksCount = useAppSelector(tasksCountSelector);
	const tasks = useAppSelector(TasksArraySelector);
	const activeCategory = useAppSelector(categorySelector);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		dispatch(TasksActions.requestTasks()); // 1 task
		console.log(tasks);
	}, []);

	return (
		<div className="App">
			<Modal show={show} onHide={handleClose}>
				<AddTaskButton handleClose={handleClose} />
			</Modal>
			<div className="App__nav">
				<CategoriesBlock />
			</div>
			<div className="App__content">
				{/* <Info /> */}
				<div className="AppHeader">
					<FilterBlock />
					<Button
						className="addTask__btn"
						variant="primary"
						onClick={handleShow}
					>
						Добавить задачу
					</Button>
				</div>
				<div className="aaaa">
					<p>Количество задач: {tasksCount}</p>

					<TasksBlock tasks={tasks} />
				</div>
			</div>
		</div>
	);
}
