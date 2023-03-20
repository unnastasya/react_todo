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
					variant={filterStatus === "all" ? "primary" : "secondary"}
					onClick={() => changeFilter("all")}
				>
					Все задачи
				</Button>
				<Button
					variant={filterStatus === "active" ? "primary" : "secondary"}
					onClick={() => changeFilter("active")}
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
