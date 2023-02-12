import axios from "axios";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IndsdG9tdiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NzYyMzMyNjEsImlzcyI6Imh0dHBzOi8vY29tcGFueV90ZXN0IiwiYXVkIjoiaHR0cHM6Ly9jb21wYW55X3Rlc3QifQ.BPieU2M3Mfd9rI4yS65hrDDDbEihOo7N6Pkj-T6eAW4";
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
