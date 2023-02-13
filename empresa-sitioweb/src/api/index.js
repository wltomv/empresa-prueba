import axios from "axios";

const token = "";
const headers = {
	"Content-type": "application/json; charset=UTF-8",
	Authorization: "Bearer " + token,
};
export const getEmployees = () => {
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
