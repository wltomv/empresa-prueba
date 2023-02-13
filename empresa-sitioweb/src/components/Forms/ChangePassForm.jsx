import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	loginRequest,
	recoveryPassChangeRequest,
	recoveryPassRequest,
} from "../../api";
import { toastProps } from "../../constants/toast.config";

function ChangePassForm() {
	const { register, reset, handleSubmit } = useForm();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const token = searchParams.get("token");
		console.log(data);
		const res = await recoveryPassChangeRequest(data.password, token);

		if (res.status == 200) {
			toast.success(
				"Contraseña restablecida, inicia sesión nuevamente",
				toastProps
			);
			navigate("/auth/login");
		} else toast.error(res.response.data, toastProps);
	};

	return (
		<Card>
			<Card.Header className=" text-center">
				Cambio de contraseña
			</Card.Header>
			<Card.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="pass">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type="password"
							placeholder="Nueva contraseña"
							{...register("password", { required: true })}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="passconfirm">
						<Form.Label>Confirmar contraseña</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirmar contraseña"
							{...register("passwordconfirm", { required: true })}
						/>
					</Form.Group>
					<Button variant="primary" type="submit" className="col-12">
						Cambiar contraseña
					</Button>
				</Form>
			</Card.Body>
			<Card.Footer className="text-muted text-center">
				<a href="/auth/recoveryPass">2023</a>
			</Card.Footer>
		</Card>
	);
}

export default ChangePassForm;
