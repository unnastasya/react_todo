import axios from "axios";

export const getCategories = (): Promise<any[]> => {
	const author = window.localStorage.getItem("userId");
	return axios
		.get("http://localhost:3000/categories")
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
		.post("http://localhost:3000/categories", data)
		.then((response) => response.data);
};

export const deleteCategories = (data: {
	id: number;
	name: string;
}): Promise<any[]> => {
	return axios.delete(`http://localhost:3000/categories/${data.id}`);
};
