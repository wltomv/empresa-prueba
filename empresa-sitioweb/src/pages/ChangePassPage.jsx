import React from "react";
import ChangePassForm from "../components/Forms/ChangePassForm";
import FormContainer from "../containers/FormContainer/FormContainer";

function LoginPage() {
	return (
		<>
			<FormContainer>
				<ChangePassForm />
			</FormContainer>
		</>
	);
}

export default LoginPage;
