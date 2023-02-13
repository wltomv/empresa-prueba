import { SET_EMPLOYEES, GET_EMPLOYEES } from "../actions/types";

const initialState = {
	employees: [],
};

export const employeesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_EMPLOYEES:
			return { ...state, employees: action.payload };
		case GET_EMPLOYEES:
			return { ...state, employees: action.payload };
		default:
			return state;
	}
};
