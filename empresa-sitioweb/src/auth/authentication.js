//TODO TEMPAL --> Repalce to server-side authentication
export const isAuthenticated = () => {
	const token = JSON.parse(localStorage.getItem("token"));
	if (token) return true;
	return false;
};

export const getToken = () => {
	const token = localStorage.getItem("token");
	if (token) return token;
	return null;
};

export const logout = () => {
	localStorage.removeItem("token");
};
