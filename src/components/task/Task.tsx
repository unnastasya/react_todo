import React, { useEffect, useState } from "react";
import { Alert, FormCheck } from "react-bootstrap";
import { Form } from "react-router-dom";
import { patchTask } from "../../api/tasks";
import { useAppDispatch, useAppSelector } from "../../store";
import { filterStatusSelector, TasksActions } from "../../store/tasks";
import { TaskType } from "../../types/TaskType";
import { DeleteButton } from "../buttons/DeleteButton";
import { DoneButton } from "../buttons/DoneButton";

import "./Task.css";

interface TaskProps {
	task: any;
}
export function Task({ task }: any) {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(filterStatusSelector)
	const [value, setValue] = useState<"done" | "undone">(task.status);

	const changeValue = () => {
		if (value === "undone") {
			patchTask(task.id, { status: "done" });
			setValue("done");
		} else {
			patchTask(task.id, { status: "undone" });
			setValue("undone");
		}
	};

    useEffect(() => {
        console.log("value", value)

        console.log("change")
        if (filter == "Все") {
        dispatch(TasksActions.requestTasks())
        } else {
            dispatch(TasksActions.changeFilter(filter))
        }
    }, [value])

	return (
		<div className={`task_${task.status}`}>
			<div>
				<div className="Checkbox">
					{task.status === "done" ? (
						<input
							type="checkbox"
							onClick={() => {
								changeValue();
							}}
							// onClick={patch}
							id={value}
							checked
						></input>
					) : (
						<input
							type="checkbox"
							onChange={() => {
								changeValue();
							}}
							id={value}
						></input>
					)}
					<p className="task_title">{task.task}</p>
				</div>
				<p className="task_description">{task.description}</p>
				<p>{task.status}</p>
				{task.category && (
					<div className="category_block">{task.category}</div>
				)}
			</div>
			<DeleteButton id={task.id} />
		</div>
	);
}
