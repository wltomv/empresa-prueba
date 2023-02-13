import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/authentication";
import LoginForm from "../components/Forms/LoginForm";
import FormContainer from "../containers/FormContainer/FormContainer";

function LoginPage() {
	if (isAuthenticated()) return <Navigate to="/" />;

	return (
		<>
			<FormContainer>
				<LoginForm />
			</FormContainer>
		</>
	);
}

export default LoginPage;
