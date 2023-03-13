import React from "react";

import {tasks} from "../../data/tasks";
import { Task } from "../task/Task";
export function TasksBlock() {
	return <div>{tasks.map((task) => <Task task={task} />)}</div>;
}
