import React from "react";
import { useAppSelector } from "../../store";
import { categorySelector, filterStatusSelector } from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { Task } from "../task/Task";

import "./TasksBlock.css";

export function TasksBlock({ tasks }: any) {
	const filterStatus: string = useAppSelector(filterStatusSelector);
	const category = useAppSelector(categorySelector);

	if (
		(tasks.length === 0) 
	) {
		if (filterStatus === "Все") {
			if (category === "Все") {
				return <p className="info_block">Задач нет</p>;
			} else {
				return (
					<p className="info_block">
						Задач из категории "{category}" нет
					</p>
				);
			}
		} else if (filterStatus === "undone") {
			if (category === "Все") {
				return <p className="info_block">Активных задач нет</p>;
			} else {
				return (
					<p className="info_block">
						Активных задач из категории "{category}" нет
					</p>
				);
			}
		} else if (filterStatus === "done") {
			if (category === "Все") {
				return <p className="info_block">Завершенных задач нет</p>;
			} else {
				return (
					<p className="info_block">
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
				{tasks.map((task: any) => (
					<Task task={task} />
				))}
			</div>
		);
}
