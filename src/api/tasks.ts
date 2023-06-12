import axios from "axios";
import { TaskType } from "../types/TaskType";

export const postTask = (data: TaskType) => {
	return axios
		.post("https://react-todo-server.vercel.app/tasks", data)
		.then((response: any) => response.data);
};

export const getTasks = (data: { status: string; category: string }): any => {
	const author = window.localStorage.getItem("userId");
	if (data.status !== "Все" && data.category !== "Все") {
		return axios
			.get(
				`https://react-todo-server.vercel.app/tasks?authorId=${author}&status=${data.status}&category=${data.category}`
			)
			.then((response) => response.data.reverse());
	} else if (data.status !== "Все" && data.category === "Все") {
		return axios
			.get(
				`https://react-todo-server.vercel.app/tasks?authorId=${author}&status=${data.status}`
			)
			.then((response) => response.data.reverse());
	} else if (data.status === "Все" && data.category !== "Все") {
		return axios
			.get(
				`https://react-todo-server.vercel.app/tasks?authorId=${author}&category=${data.category}`
			)
			.then((response) => response.data.reverse());
	} else {
		return axios
			.get(`https://react-todo-server.vercel.app/tasks?authorId=${author}`)
			.then((response) => response.data.reverse());
	}
};

export const getOneTask = (id: number): any => {
	return axios
		.get(`https://react-todo-server.vercel.app/tasks?id=${id}`)
		.then((response) => response.data);
};

export const deleteTask = (id: number): any => {
	return axios
		.delete(`https://react-todo-server.vercel.app/tasks/${id}`)
		.then((response) => response.data);
};

export const patchTask = (id: number, data: any): any => {
	return axios
		.patch(`https://react-todo-server.vercel.app/tasks/${id}`, data)
		.then((response) => response.data);
};
