import React from "react";
import "./App.css";
import { AddTaskButton } from "./components/buttons/AddTaskButton";
import { TasksBlock } from "./components/tasksBlock/TasksBlock";

function App() {
	return (
		<div className="App">
            <div className="AppHeader">
					<AddTaskButton />
				</div>
			<TasksBlock />
		</div>
	);
}

export default App;
