import { useEffect, useState } from "react";
import { Card, Button, Badge, Row, Col, Stack } from "react-bootstrap";
import { getSalary } from "../../api";

function Salary({ employeeId }) {
	const [salaryDetails, setsalaryDetails] = useState({});

	useEffect(() => {
		const fetchSalary = async () => {
			const data = await getSalary(employeeId);
			setsalaryDetails(data);
		};
		fetchSalary();
	}, []);
	return (
		<Card>
			<Card.Header className="text-center">
				Detalles del salario
			</Card.Header>
			<Card.Body>
				<Stack gap={3}>
					<Row>
						<Card.Subtitle>Bono Decreto</Card.Subtitle>
						<Card.Text>
							<Badge bg="light" text="dark">
								Q {salaryDetails.decreeBonus}
							</Badge>
						</Card.Text>
					</Row>
					<Row>
						<Col sm={6}>
							<Card.Subtitle>IGGS</Card.Subtitle>
							<Card.Text>
								<Badge bg="light" text="dark">
									Q {salaryDetails.iggs}
								</Badge>
							</Card.Text>
						</Col>
						<Col sm={6}>
							<Card.Subtitle>IRTRA</Card.Subtitle>
							<Card.Text>
								<Badge bg="light" text="dark">
									Q {salaryDetails.irtra}
								</Badge>
							</Card.Text>
						</Col>
					</Row>
					<Row>
						<Card.Subtitle>Salario total:</Card.Subtitle>
						<Card.Text>
							<Badge bg="light" text="dark">
								Q {salaryDetails.totalSalary}
							</Badge>
						</Card.Text>
					</Row>
				</Stack>
			</Card.Body>
			<Card.Footer className="text-muted">
				Salario Liquido{" "}
				<Badge bg="success">Q {salaryDetails.netSalary}</Badge>
			</Card.Footer>
		</Card>
	);
}

export default Salary;
