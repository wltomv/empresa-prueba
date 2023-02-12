import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function AppLayout() {
	return (
		<>
			<Navbar />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export default AppLayout;
