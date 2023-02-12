import { useEffect, useState } from "react";
import { getEmployees } from "../../api";
import DataTable from "react-data-table-component";

function CustomDatatable() {
	const [employees, setEmployees] = useState([]);

	const fetchEmployees = async () => {
		const data = await getEmployees();
		console.log(data);
		setEmployees(data);
	};
	useEffect(() => {
		fetchEmployees();
	}, []);

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
			cell: (row) => {
				return (
					<>
						<button>Editar</button>
						<button>Eliminar</button>
					</>
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
		<div>
			<DataTable
				columns={columns}
				data={employees}
				title="Empleados"
				pagination
				paginationComponentOptions={paginationOptions}
				fixedHeader
				fixedHeaderScrollHeight="500px"
				onRowClicked={(row) => console.log(row)}
				customStyles={customStyles}
			></DataTable>
		</div>
	);
}

export default CustomDatatable;
