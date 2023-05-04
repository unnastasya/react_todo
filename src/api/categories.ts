import axios from "axios";

export const getCategories = (): Promise<any[]> => {
	const author = window.localStorage.getItem("userId");
	return axios
		.get("https://my-json-server.typicode.com/unnastasya/react_todo_server/categories")
		.then((response) =>
			response.data.filter(
				(category: any) =>
					category.authorId === "" ||
					category.authorId === Number(author)
			)
		);
};

export const postCategories = (data: any): Promise<any[]> => {
	return axios
		.post("https://my-json-server.typicode.com/unnastasya/react_todo_server/categories", data)
		.then((response) => response.data);
};

export const deleteCategories = (data: {
	id: number;
	name: string;
}): Promise<any[]> => {
	return axios.delete(`https://my-json-server.typicode.com/unnastasya/react_todo_server/categories/${data.id}`);
};
