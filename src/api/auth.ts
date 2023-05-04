import axios from "axios";
import { UserRegisterType } from "../types/UserType";

export const findUser = (data: any): Promise<any> => {
	return axios
		.get(`http://localhost:3000/users?email=${data.email}`)
		.then((response) => response.data[0])
		.catch((error) => error);
};

export const addUser = (data: UserRegisterType) => {
	return axios
		.post("http://localhost:3000/users", data)
		.then((response) => response.data);
};
