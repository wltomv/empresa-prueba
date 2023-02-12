import { useEffect, useState } from "react";
import { getEmployees } from "../../api";
import DataTable from "react-data-table-component";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Button, Stack } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import EmployeeForm from "../EmployeeForm/EmployeeForm";

function CustomDatatable() {
	const [employees, setEmployees] = useState([]);
	const [currentEmployee, setCurrentEmployee] = useState({});
	const [editEmployee, setEditEmployee] = useState({});

	const [isOpen, openModal, closeModal] = useModal();
	const [isOpenEdit, openModalEdit, closeModalEdit] = useModal();

	const fetchEmployees = async () => {
		const data = await getEmployees();
		console.log(data);
		setEmployees(data);
	};
	useEffect(() => {
		fetchEmployees();
	}, []);

	const onRowClick = (employee) => {
		setCurrentEmployee(employee);
		openModal();
	};

	const onEdit = (employee) => {
		setEditEmployee(employee);
		openModalEdit();
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
						<Button variant="danger">
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
					data={employees}
					title="Empleados"
					pagination
					paginationComponentOptions={paginationOptions}
					fixedHeader
					fixedHeaderScrollHeight="500px"
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
			</ModalContainer>
			<ModalContainer
				title={"Editar Empleado"}
				show={isOpenEdit}
				handleShow={openModalEdit}
				handleClose={closeModalEdit}
			>
				<EmployeeForm edit={true} employee={editEmployee} />
			</ModalContainer>
		</>
	);
}

export default CustomDatatable;
