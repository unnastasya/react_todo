import React from "react";
import { AddTaskButton } from "../components/buttons/AddTaskButton";
import { CategoriesBlock } from "../components/categoriesBlock/categoriesBlock";
import { FilterBlock } from "../components/filterBlock/filterBlock";
import { Info } from "../components/info/info";
import { TasksBlock } from "../components/tasksBlock/tasksBlock";
import { useAppSelector } from "../store";
import { filterStatusSelector, tasksCountSelector, TSelector } from "../store/tasks";
import { TaskType } from "../types/TaskType";

import "./TasksPage.css"

export function TasksPage()  {
    const tasks: TaskType[] = useAppSelector(TSelector);
	const filterStatus: string = useAppSelector(filterStatusSelector);
    const countTasks: number = useAppSelector(tasksCountSelector)

	return (
		<div className="App">
			<div className="App__nav">
				<CategoriesBlock />
			</div>
			<div className="App__content">
            <Info />
				<div className="AppHeader">
					<AddTaskButton />
					<FilterBlock />
				</div>
                <p>Количество задач: {countTasks}</p>

				{filterStatus === "all" && (
					<TasksBlock tasks={tasks} status="all" />
				)}

				{filterStatus === "active" && (
					<TasksBlock
						tasks={tasks.filter((task) => task.isActiveTask)}
						status="all"
					/>
				)}

				{filterStatus === "done" && (
					<TasksBlock
						tasks={tasks.filter((task) => !task.isActiveTask)}
						status="all"
					/>
				)}

				
			</div>
		</div>
	);
}