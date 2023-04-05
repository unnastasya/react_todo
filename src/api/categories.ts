import axios from "axios";

export const getCategories = (): Promise<any[]> => {
	return axios
		.get("http://localhost:3000/categories")
		.then((response) => response.data);
};

export const postCategories = (data: any): Promise<any[]> => {
	return axios
		.post("http://localhost:3000/categories", data)
		.then((response) => response.data);
};

export const deleteCategories = (data: any): Promise<any[]> => {
		return axios
			.delete(`http://localhost:3000/categories/${data}`)
	};
