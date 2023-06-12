import React, { useEffect, useState } from "react";
import { patchTask } from "../../api/tasks";
import { useAppDispatch } from "../../store";
import { TasksActions } from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { ChangeButton } from "../buttons/ChangeButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { isOverdueTask } from "../../utils/isOverdueTask";
import dayjs from "dayjs";

import "./Task.css";

interface TaskProps {
	task: TaskType;
}
export function Task({ task }: TaskProps) {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState<"done" | "undone" | "overdue">(
		task.status
	);
	const dateTo = dayjs(task.dateTo).format("dd, DD MMMM YYYY");

	dayjs.locale("ru");

	useEffect(() => {
		isOverdueTask(task);
	}, [value]);

	const changeValue = () => {
		if (value === "undone") {
			patchTask(task.id, { status: "done" });
			setValue("done");
			dispatch(TasksActions.requestTasks());
		} else {
			patchTask(task.id, { status: "undone" });
			setValue("undone");
			dispatch(TasksActions.requestTasks());
		}
	};

	return (
		<div className={`task_${task.status}`} data-testid={`task__${task.id}`}>
			<div>
				<div className="Checkbox">
					<input
						type="checkbox"
						onClick={() => {
							changeValue();
						}}
						id={value}
						checked={value === "done"}
						disabled={value === "overdue"}
					></input>

					<p className="task_title">{task.task}</p>
				</div>
				<div style={{ marginLeft: "20px" }}>
					<p className="task_description">{task.description}</p>

					{task.category && task.category !== "Все" && (
						<div className="category_block">{task.category}</div>
					)}

					{task.dateTo && (
						<div className={`date_block_${task.status}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-calendar-check"
								viewBox="0 0 16 16"
							>
								<path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
							</svg>

							<p className={`date_text`}>Срок: {dateTo}</p>
						</div>
					)}
				</div>
			</div>
			<div className="Tasks_buttons">
				<ChangeButton task={task} />
				<DeleteButton task={task} />
			</div>
		</div>
	);
}
