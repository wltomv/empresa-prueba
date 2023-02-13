import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import FormContainer from "../containers/FormContainer/FormContainer";
import ModalContainer from "../containers/ModalContainer/ModalContainer";

function LoginPage() {
	return (
		<>
			<FormContainer>
				<LoginForm />
			</FormContainer>
		</>
	);
}

export default LoginPage;
