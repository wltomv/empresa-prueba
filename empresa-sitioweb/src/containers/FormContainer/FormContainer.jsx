function FormContainer({ children }) {
	return (
		<div className="m-0 vh-100 row justify-content-center align-items-center">
			<div className="col-sm-8 col-md-8 col-lg-6 p-5">{children}</div>
		</div>
	);
}

export default FormContainer;
