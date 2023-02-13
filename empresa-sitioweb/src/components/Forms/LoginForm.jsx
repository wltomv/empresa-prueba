import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginRequest } from "../../api";
import { toastProps } from "../../constants/toast.config";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";
import useModal from "../../hooks/useModal";

function LoginForm() {
	const { register, reset, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		const res = await loginRequest(data);
		if (res.status == 200) {
			toast.success("Bienvenido", toastProps);
		} else toast.error("Datos incorrectos", toastProps);
	};

	return (
		<>
			<Card>
				<Card.Header className=" text-center">
					Inicio de sesión
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3" controlId="usuario">
							<Form.Label>Usuario</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nombre de usuario"
								{...register("username", { required: true })}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="Contraseña"
								{...register("password", { required: true })}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							className="col-12"
						>
							Entrar
						</Button>
					</Form>
				</Card.Body>
				<Card.Footer className="text-muted text-center">
					<a href="/auth/recoveryPass">¿Olvidaste tu contraseña?</a>
				</Card.Footer>
			</Card>
		</>
	);
}

export default LoginForm;
