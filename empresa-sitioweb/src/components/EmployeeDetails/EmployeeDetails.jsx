import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";

function EmployeeDetails({ employee }) {
	return (
		<Container>
			<Row>
				<Col sm={8}>
					<InputGroup className="mb-3">
						<InputGroup.Text>Nombre</InputGroup.Text>
						<Form.Control
							aria-label="name"
							value={employee.fullName}
							disabled
						/>
					</InputGroup>
				</Col>
				<Col sm={4}>
					<InputGroup className="mb-3">
						<InputGroup.Text>DPI</InputGroup.Text>
						<Form.Control
							aria-label="dpi"
							value={employee.dpi}
							disabled
						/>
					</InputGroup>
				</Col>
			</Row>
			<Row>
				<Col sm={8}>
					<InputGroup className="mb-3">
						<InputGroup.Text>Salario base</InputGroup.Text>
						<Form.Control
							aria-label="dpi"
							value={employee.baseSalary}
							disabled
						/>
					</InputGroup>
				</Col>
				<Col sm={4}>
					<InputGroup className="mb-3">
						<InputGroup.Text>Hijos</InputGroup.Text>
						<Form.Control
							aria-label="dpi"
							value={employee.numberChildren}
							disabled
						/>
					</InputGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default EmployeeDetails;
