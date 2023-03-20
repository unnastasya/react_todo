import React from "react";
import { useAppSelector } from "../../store";
import { categorySelector, filterStatusSelector } from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { Task } from "../task/Task";

export function TasksBlock({ tasks }: any) {
	const filterStatus: string = useAppSelector(filterStatusSelector);
	const category = useAppSelector(categorySelector);

	if (
		(category === "все задачи" && tasks.length === 0) ||
		(category !== "все задачи" &&
			tasks.filter((task: TaskType) => task.category === category)
				.length === 0)
	) {
		if (filterStatus === "all") {
			return <p>Задач нет</p>;
		} else if (filterStatus === "active") {
			return <p>Активных задач нет</p>;
		} else if (filterStatus === "done") {
			return <p>Завершенных задач нет</p>;
		} else {
			return null;
		}
	} else
		return (
			<div>
				{category !== "все задачи"
					? tasks
							.filter(
								(task: TaskType) => task.category === category
							)
							.map((task: TaskType) => <Task task={task} />)
					: tasks.map((task: TaskType) => <Task task={task} />)}
			</div>
		);
}
