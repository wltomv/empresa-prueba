import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postEmployee, putEmployee } from "../../api";
import { toastProps } from "../../constants/toast.config";

function EmployeeForm({ edit = false, employee = undefined }) {
	const { register, reset, handleSubmit } = useForm({
		defaultValues: { ...employee },
	});

	const onSubmit = async (data) => {
		if (!edit) {
			const res = await postEmployee(data);
			if (res.status == 200) {
				reset();
				toast.success("Empleado guardado con éxito", toastProps);
			} else {
				toast.error("Algo salió mal, intentalo mas tarde", toastProps);
			}
		} else {
			console.log(data);
			const res = await putEmployee(data);
			if (res.status == 200) {
				reset();
				toast.success("Empleado editado con éxito", toastProps);
			} else {
				toast.error("Algo salió mal, intentalo mas tarde", toastProps);
			}
		}

		console.log(data);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col sm={8}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							placeholder="Nombre completo"
							{...register("fullName", {
								required: true,
							})}
						/>
					</Form.Group>
				</Col>
				<Col sm={4}>
					<Form.Group className="mb-3" controlId="dpi">
						<Form.Label>DPI</Form.Label>
						<Form.Control
							type="text"
							placeholder="DPI"
							{...register("dpi", {
								required: true,
							})}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col sm={8}>
					<Form.Group className="mb-3" controlId="salario">
						<Form.Label>Salario base</Form.Label>
						<Form.Control
							type="number"
							placeholder="Salario base"
							{...register("baseSalary", {
								required: true,
							})}
						/>
					</Form.Group>
				</Col>
				<Col sm={4}>
					<Form.Group className="mb-3" controlId="hijos">
						<Form.Label>Hijos</Form.Label>
						<Form.Control
							type="number"
							placeholder="Numero de hijos"
							{...register("numberChildren", {
								required: true,
							})}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Button variant="primary" type="submit">
				{!edit ? "Guardar" : "Editar"}
			</Button>
		</Form>
	);
}

export default EmployeeForm;
