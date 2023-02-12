import React, { useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import CustomDatatable from "../../components/CustomDatatable/CustomDatatable";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";
import useModal from "../../hooks/useModal";

const Employees = () => {
	const [isOpen, openModal, closeModal] = useModal(false);

	return (
		<Container fluid>
			<div className="d-flex flex-row-reverse">
				<div>
					<Button variant="primary" onClick={openModal}>
						Agregar empleado
					</Button>
				</div>
			</div>
			<CustomDatatable />
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
