import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { filterStatusSelector, TasksActions } from "../../store/tasks";

import "./filterBlock.css"

export function FilterBlock() {
	const dispatch = useAppDispatch();

	const filterStatus: string = useAppSelector(filterStatusSelector);
	
	const changeFilter = (str: string) => {
		dispatch(TasksActions.changeFilter(str));
	};
	return (
		<div>
			<ButtonGroup aria-label="Basic example">
				<Button
					variant={filterStatus === "Все" ? "primary" : "secondary"}
					onClick={() => {dispatch(TasksActions.changeFilter("Все")); }}
				>
					Все задачи
				</Button>
				<Button
					variant={filterStatus === "undone" ? "primary" : "secondary"}
					onClick={() => changeFilter("undone")}
				>
					Активные
				</Button>
				<Button
					variant={filterStatus === "done" ? "primary" : "secondary"}
					onClick={() => changeFilter("done")}
				>
					Сделанные
				</Button>
			</ButtonGroup>
		</div>
	);
}
