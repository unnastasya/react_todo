import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TasksPage } from "./pages/TasksPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />}></Route>
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />
			<Route path="tasks" element={<TasksPage />}></Route>
		</Routes>
	);
}

export default App;
