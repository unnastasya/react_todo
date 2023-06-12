import axios from "axios";
import { UserRegisterType } from "../types/UserType";

export const findUser = (data: any): Promise<any> => {
	return axios
		.get(`https://react-todo-server.vercel.app/users?email=${data.email}`)
		.then((response) => response.data[0])
		.catch((error) => error);
};

export const addUser = (data: UserRegisterType) => {
	return axios
		.post("https://react-todo-server.vercel.app/users", data)
		.then((response) => response.data);
};
