import React from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../store";
import { TasksActions } from "../../store/tasks";

export function DoneButton({ id, status }: any) {
	const dispatch = useAppDispatch();
	const changeStatus = () => {
		dispatch(TasksActions.changeStatusTask(id));
	};
	return (
		<Button onClick={changeStatus} variant="outline-primary">
			{status ? "Готово" : "Отменить"}
		</Button>
	);
}
