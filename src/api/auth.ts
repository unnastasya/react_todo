import axios from "axios";
import { UserRegisterType } from "../types/UserType";

export const findUser = (data: any): Promise<any> => {
	return axios
		.get(`https://my-json-server.typicode.com/unnastasya/react_todo_server/users?email=${data.email}`)
		.then((response) => response.data[0])
		.catch((error) => error);
};

export const addUser = (data: UserRegisterType) => {
	return axios
		.post("https://my-json-server.typicode.com/unnastasya/react_todo_server/users", data)
		.then((response) => response.data);
};
