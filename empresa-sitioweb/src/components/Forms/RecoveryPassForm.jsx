import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginRequest, recoveryPassRequest } from "../../api";
import { toastProps } from "../../constants/toast.config";
import { useNavigate } from "react-router-dom";

function RecoveryPassForm() {
	const { register, reset, handleSubmit } = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const res = await recoveryPassRequest(data);
		console.log(res);
		if (res.status == 200) {
			toast.success("Correo enviado con éxito", toastProps);
			navigate("/auth/login");
		} else toast.error(res.response.data, toastProps);
	};

	return (
		<Card>
			<Card.Header className=" text-center">
				Recuperación de contraseña
			</Card.Header>
			<Card.Body>
				<Card.Text>
					Introduce la dirección de correo electrónico verificada de
					tu cuenta de usuario y te enviaremos un enlace para
					restablecer la contraseña.
				</Card.Text>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="email">
						<Form.Control
							type="email"
							placeholder="introduce tu dirección de correo electrónico"
							{...register("mail", { required: true })}
						/>
					</Form.Group>
					<Button variant="primary" type="submit" className="col-12">
						Enviar correo de restablecimiento de contraseña
					</Button>
				</Form>
			</Card.Body>
			<Card.Footer className="text-muted text-center">
				<a href="/auth/recoveryPass">2023</a>
			</Card.Footer>
		</Card>
	);
}

export default RecoveryPassForm;
