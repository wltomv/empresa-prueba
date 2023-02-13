import {
	SET_EMPLOYEES,
	GET_EMPLOYEES,
	ADD_EMPLOYEE,
	UPDATE_EMPLOYEE,
	DELETE_EMPLOYEE,
} from "./types";

export const setEmployees = (payload) => ({
	type: SET_EMPLOYEES,
	payload,
});

const getEmployees = (employees) => ({
	type: GET_EMPLOYEES,
	payload: employees,
});
const addEmployee = (employees) => ({ type: ADD_EMPLOYEE, payload: employees });

const updateEmployee = (employees) => ({
	type: UPDATE_EMPLOYEE,
	payload: employees,
});

const deleteEmployee = (id) => ({ type: DELETE_EMPLOYEE, payload: id });
