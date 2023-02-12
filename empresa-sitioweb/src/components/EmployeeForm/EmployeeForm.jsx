import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function EmployeeForm({ edit = false, employee = undefined }) {
	const { register, handleSubmit } = useForm({
		defaultValues: { ...employee },
	});

	const onSubmit = (data) => {
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
