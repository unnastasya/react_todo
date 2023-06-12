import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { AddTaskModal } from "../../components/AddTaskModal/AddTaskModal";
import { CategoriesBlock } from "../../components/CategoriesBlock/CategoriesBlock";
import { CategoriesModal } from "../../components/CategoriesModal/CategoriesModal";
import { ChangeTaskModal } from "../../components/ChangeTaskModal/ChangeTaskModal";
import { StatusBlock } from "../../components/StatusBlock/StatusBlock";
import { TasksBlock } from "../../components/TasksBlock/TasksBlock";
import { useAppDispatch, useAppSelector } from "../../store";
import { CategoriesActions } from "../../store/categories";
import {
	changeTaskDataSelector,
	TasksActions,
	tasksCountSelector,
} from "../../store/tasks";

import "./TasksPage.css";

export function TasksPage() {
	const dispatch = useAppDispatch();
	const tasksCount: number = useAppSelector(tasksCountSelector);

	useEffect(() => {
		dispatch(CategoriesActions.requestCategories());
		dispatch(TasksActions.requestTasks()); // 1 task
	}, []);

	const openCategoryModal = () => {
		dispatch(CategoriesActions.openCategoriesModal());
	};

	const width = window.outerWidth;

	const openAddTaskModal = () => {
		dispatch(TasksActions.openAddTaskModal());
	};

	return (
		<div className="tasksPage">
			<AddTaskModal />
			<ChangeTaskModal />

			{width > 960 ? (
				<div className="tasksPage__categoriesBlock">
					<CategoriesBlock />
				</div>
			) : (
				<CategoriesModal />
			)}

			<div className="tasksPage__content">
				<div className="tasksPage__header">
					{width <= 960 && (
						<svg
							onClick={openCategoryModal}
							color="#0055e8"
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							className="bi bi-arrow-right-square-fill"
							viewBox="0 0 16 16"
						>
							<path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
						</svg>
					)}
					<StatusBlock />
					{width > 960 && (
						<Button
							className="tasksPage__addTaskButton"
							variant="primary"
							onClick={openAddTaskModal}
						>
							Добавить задачу
						</Button>
					)}
				</div>

				<div className="tasksPage__tasksBlock">
					<p>Количество задач: {tasksCount}</p>

					{width <= 960 && (
						<Button
							className="tasksPage__addTaskButton"
							variant="primary"
							onClick={openAddTaskModal}
						>
							Добавить задачу
						</Button>
					)}

					<TasksBlock />
				</div>
			</div>
		</div>
	);
}
