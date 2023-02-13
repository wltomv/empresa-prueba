import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import CustomDatatable from "../../components/CustomDatatable/CustomDatatable";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../../state/actions";
import { getEmployees } from "../../api";

const Employees = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, openModal, closeModal] = useModal(false);
	const employees = useSelector((state) => state.employees);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchEmployees = async () => {
			const data = await getEmployees();
			dispatch(setEmployees([...data]));
			setIsLoading(false);
		};
		setIsLoading(true);
		fetchEmployees();
	}, []);

	return (
		<Container fluid>
			<div className="d-flex flex-row-reverse">
				<div>
					<Button variant="primary" onClick={openModal}>
						Agregar empleado
					</Button>
				</div>
			</div>
			{isLoading ? (
				<h1>Cargando...</h1>
			) : (
				<CustomDatatable content={employees.employees} />
			)}
			<ModalContainer
				title={"Agregar Empleado"}
				show={isOpen}
				handleShow={openModal}
				handleClose={closeModal}
			>
				<EmployeeForm />
			</ModalContainer>
		</Container>
	);
};

export default Employees;
