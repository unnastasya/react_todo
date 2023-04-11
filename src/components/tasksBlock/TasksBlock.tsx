import React from "react";
import { useAppSelector } from "../../store";
import {
	categoryFilterSelector,
	statusFilterSelector,
	tasksArraySelector,
} from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { Task } from "../Task/Task";

import "./TasksBlock.css";

export function TasksBlock() {
	const filterStatus: string = useAppSelector(statusFilterSelector);
	const category: string = useAppSelector(categoryFilterSelector);
	const tasks: TaskType[] = useAppSelector(tasksArraySelector);

	if (tasks.length === 0) {
		if (filterStatus === "Все") {
			if (category === "Все") {
				return <p className="tasksBlock__infoBlock">Задач нет</p>;
			} else {
				return (
					<p className="tasksBlock__infoBlock">
						Задач из категории "{category}" нет
					</p>
				);
			}
		} else if (filterStatus === "undone") {
			if (category === "Все") {
				return (
					<p className="tasksBlock__infoBlock">Активных задач нет</p>
				);
			} else {
				return (
					<p className="tasksBlock__infoBlock">
						Активных задач из категории "{category}" нет
					</p>
				);
			}
		} else if (filterStatus === "done") {
			if (category === "Все") {
				return (
					<p className="tasksBlock__infoBlock">
						Завершенных задач нет
					</p>
				);
			} else {
				return (
					<p className="tasksBlock__infoBlock">
						Завершенных задач из категории "{category}" нет
					</p>
				);
			}
		} else {
			return null;
		}
	} else
		return (
			<div>
				{tasks.map((task: TaskType) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		);
}
