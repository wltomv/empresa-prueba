import axios from "axios";

const token = "";
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
