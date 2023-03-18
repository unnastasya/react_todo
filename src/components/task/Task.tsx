import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { TaskType } from "../../types/TaskType";
import { DeleteButton } from "../buttons/DeleteButton";
import { DoneButton } from "../buttons/DoneButton";

interface TaskProps {
	task: TaskType;
}
export function Task({ task }: TaskProps) {
	const isActiveTask = task.isActiveTask;

    
	return (
		<div>
			<Alert variant={isActiveTask? "dark": "primary"}>
				<p>{task.title}</p>
                <p>Категория: {task.category}</p>
                <DoneButton id={task.id} status={task.isActiveTask} />
				<DeleteButton id={task.id} />

			</Alert>
		</div>
	);
}
