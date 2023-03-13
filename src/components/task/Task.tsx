import React from "react";
import { Alert } from "react-bootstrap";
import { DeleteButton } from "../buttons/DeleteButton";
import { DoneButton } from "../buttons/DoneButton";


export function Task({ task }: any) {
	return <div>
    <Alert variant={task.isActiveTask? "dark": "primary"}>
				<p>{task.title}</p>
                <p>Категория: {task.category}</p>
                <DoneButton id={task.id} status={task.isActiveTask} />
				<DeleteButton id={task.id} />

			</Alert>
</div>;
}
