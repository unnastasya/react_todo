import React, { useEffect } from "react";
import { useAppSelector } from "../../store";
import { tasksSelector } from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { Task } from "../task/Task";

export function TasksBlock() {
	const tasks: TaskType[] = useAppSelector(tasksSelector);

	return (
		<div>
			{tasks.map((task: TaskType) => (
				<Task task={task} />
			))}
		</div>
	);
}
