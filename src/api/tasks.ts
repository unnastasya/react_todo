import axios from "axios";

export const postTask = (data: any) => {
	return axios
		.post("http://localhost:3000/tasks", data)
		.then((response: any) => response.data);
};

export const getTasks = (data: { status: string; category: string }): any => {
	if (data.status !== "Все" && data.category !== "Все") {
		console.log(data?.status, data?.category, "status & category");
		return axios
			.get(
				`http://localhost:3000/tasks?status=${data.status}&category=${data.category}`
			)
			.then((response) => response.data);
	} else if (data.status !== "Все" && data.category === "Все") {
		console.log("status");

		return axios
			.get(`http://localhost:3000/tasks?status=${data.status}`)
			.then((response) => response.data);
	} else if (data.status === "Все" && data.category !== "Все") {
		console.log("category");

		return axios
			.get(`http://localhost:3000/tasks?category=${data.category}`)
			.then((response) => response.data);
	} else {
		return axios
			.get("http://localhost:3000/tasks")
			.then((response) => response.data);
	}
};

// export const getTasksWithStatusParams = (data: any): any => {
// 	return axios
// 		.get(`http://localhost:3000/tasks?status=${data}`)
// 		.then((response) => response.data);
// };

// export const getTasksWithCategoryParams = (data: any): any => {
// 	console.log("Data", data);
// 	return axios
// 		.get(`http://localhost:3000/tasks?category=${data}`)
// 		.then((response) => response.data);
// };

export const deleteTask = (id: number): any => {
	return axios
		.delete(`http://localhost:3000/tasks/${id}`)
		.then((response) => response.data);
};

export const patchTask = (id: number, data: any): any => {
	return axios
		.patch(`http://localhost:3000/tasks/${id}`, data)
		.then((response) => response.data);
};
