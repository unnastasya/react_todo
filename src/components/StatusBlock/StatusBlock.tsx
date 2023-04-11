import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { statusFilterSelector, TasksActions } from "../../store/tasks";

import "./StatusBlock.css"

export function StatusBlock() {
	const dispatch = useAppDispatch();

	const filterStatus: string = useAppSelector(statusFilterSelector);
	
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
					Все
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
