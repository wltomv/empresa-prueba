import { useState } from "react";
import { deleteEmployee, getEmployees } from "../../api";
import DataTable from "react-data-table-component";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Button, Col, Row, Stack } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import Salary from "../Salary/Salary";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { setEmployees } from "../../state/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastProps } from "../../constants/toast.config";

function CustomDatatable({ content }) {
	const [currentEmployee, setCurrentEmployee] = useState({});
	const [selectedEmployee, setSelectedEmployee] = useState({});

	const [isOpen, openModal, closeModal] = useModal();
	const [isOpenEdit, openModalEdit, closeModalEdit] = useModal();
	const [isOpenDelete, openModalDelete, closeModalDelete] = useModal();

	const employees = useSelector((state) => state.employees);
	const dispatch = useDispatch();

	const fetchEmployees = async () => {
		const data = await getEmployees();
		dispatch(setEmployees([...data]));
	};

	const onRowClick = (employee) => {
		setCurrentEmployee(employee);
		openModal();
	};

	const onEdit = (employee) => {
		setSelectedEmployee(employee);
		openModalEdit();
	};

	const onDelete = (employee) => {
		setSelectedEmployee(employee);
		openModalDelete();
	};

	const onDeleteEmployee = async (id) => {
		const res = await deleteEmployee(id);

		if (res.status == 200) {
			fetchEmployees();
			closeModalDelete();
			toast.success("Empleado eliminado con éxito", toastProps);
		} else {
			toast.error("Algo salió mal, intentalo mas tarde", toastProps);
		}
	};

	const columns = [
		{
			name: "DPI",
			selector: (row) => row.dpi,
			sortable: true,
			style: {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
		{
			name: "Nombre",
			selector: (row) => row.fullName,
			sortable: true,
			style: {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
		{
			name: "Acciones",
			width: "10rem",
			cell: (row) => {
				return (
					<Stack direction="horizontal" gap={3}>
						<Button
							variant="warning"
							onClick={() => {
								onEdit(row);
							}}
						>
							<AiFillEdit />
						</Button>
						<Button
							variant="danger"
							onClick={() => {
								onDelete(row);
							}}
						>
							<AiFillDelete />
						</Button>
					</Stack>
				);
			},
		},
	];

	const paginationOptions = {
		rowsPerPageText: "Filas por página",
		rangeSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "todos",
	};

	const customStyles = {
		rows: {
			style: {
				"&:hover": {
					color: "white",
					background: "#52658f",
				},
			},
		},
		headCells: {
			style: {
				color: "white",
				background: "#333a56",
			},
		},
	};

	return (
		<>
			<div>
				<DataTable
					columns={columns}
					data={content}
					title="Empleados"
					pagination
					paginationComponentOptions={paginationOptions}
					fixedHeader
					fixedHeaderScrollHeight="350px"
					onRowClicked={(row) => onRowClick(row)}
					customStyles={customStyles}
				></DataTable>
			</div>
			<ModalContainer
				title={"Detalles del empleado"}
				show={isOpen}
				handleShow={openModal}
				handleClose={closeModal}
			>
				<EmployeeDetails employee={currentEmployee} />
				<Salary employeeId={currentEmployee.id} />
			</ModalContainer>
			<ModalContainer
				title={"Editar Empleado"}
				show={isOpenEdit}
				handleShow={openModalEdit}
				handleClose={closeModalEdit}
			>
				<EmployeeForm edit={true} employee={selectedEmployee} />
			</ModalContainer>
			<ModalContainer
				title={"Eliminar Empleado"}
				show={isOpenDelete}
				handleShow={openModalDelete}
				handleClose={closeModalDelete}
			>
				<EmployeeDetails employee={selectedEmployee} />
				<span>¿Estás seguro de que quieres eliminar el empleado?</span>
				<div className="d-flex justify-content-center">
					<Stack direction="horizontal" gap={3}>
						<Button
							variant="primary"
							size="lg"
							onClick={closeModalDelete}
						>
							Cancelar
						</Button>
						<Button
							variant="danger"
							size="lg"
							onClick={() =>
								onDeleteEmployee(selectedEmployee.id)
							}
						>
							Eliminar
						</Button>
					</Stack>
				</div>
			</ModalContainer>
		</>
	);
}

export default CustomDatatable;
