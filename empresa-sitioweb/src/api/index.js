import axios from "axios";
import { getToken } from "../auth/authentication";

const token = JSON.parse(getToken());
const headers = {
	"Content-type": "application/json; charset=UTF-8",
	Authorization: `Bearer ${token}`,
};

export const getEmployees = () => {
	const token = JSON.parse(getToken());
	const headers = {
		"Content-type": "application/json; charset=UTF-8",
		Authorization: `Bearer ${token}`,
	};
	return axios
		.get("http://localhost:5040/api/Employee", { headers })
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

export const getSalary = (id) => {
	return axios
		.get("http://localhost:5040/api/Salary/Calculations/" + id, { headers })
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

export const postEmployee = (employee) => {
	return axios
		.post(
			"http://localhost:5040/api/Employee",
			{ userid: 1, employee },
			{ headers }
		)
		.then((res) => res)
		.catch((err) => console.log(err));
};

export const putEmployee = (employee) => {
	return axios
		.put("http://localhost:5040/api/Employee", { ...employee }, { headers })
		.then((res) => res)
		.catch((err) => console.log(err));
};

export const deleteEmployee = (id) => {
	return axios
		.delete(`http://localhost:5040/api/Employee/${id}`, { headers })
		.then((res) => res)
		.catch((err) => console.log(err));
};

export const loginRequest = (user) => {
	return axios
		.post("http://localhost:5040/api/Auth/login", { ...user })
		.then((res) => res)
		.catch((err) => err);
};

export const recoveryPassRequest = (email) => {
	return axios
		.post("http://localhost:5040/api/Auth/recoveryPassword", { ...email })
		.then((res) => res)
		.catch((err) => err);
};

export const recoveryPassChangeRequest = (password, token) => {
	return axios
		.post(
			`http://localhost:5040/api/Auth/recoveryPassword/change?token=${token}`,
			{ password }
		)
		.then((res) => res)
		.catch((err) => err);
};
