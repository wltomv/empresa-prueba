import axios from "axios";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IndsdG9tdiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NzYyMjg1NzUsImlzcyI6Imh0dHBzOi8vY29tcGFueV90ZXN0IiwiYXVkIjoiaHR0cHM6Ly9jb21wYW55X3Rlc3QifQ.j6vz-ycl5bxAyWLbplH5x1e7quxlq-1KTJw08edbZHw";
export const getEmployees = () => {
	const headers = {
		"Content-type": "application/json; charset=UTF-8",
		Authorization: "Bearer " + token,
	};
	return axios
		.get("http://localhost:5040/api/Employee", { headers })
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
