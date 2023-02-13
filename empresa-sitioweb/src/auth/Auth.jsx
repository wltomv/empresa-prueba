import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./authentication";

function AuthRoute({ children }) {
	if (!isAuthenticated()) {
		return <Navigate to="/auth/login" />;
	}
	return children;
}

export default AuthRoute;
