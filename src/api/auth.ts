import axios from "axios";

export const findUser = (data: any): Promise<any> => {
    return axios
        .get(`http://localhost:3000/users?email=${data.email}`)
        .then((response) => response.data)
        .catch((error) => error);
};

export const addUser = (data: any) => {
    return axios
        .post("http://localhost:3000/users", data)
        .then((response) => console.log(response.data));
};