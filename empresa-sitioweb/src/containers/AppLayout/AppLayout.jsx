import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function AppLayout() {
	return (
		<>
			<Navbar />
			<Container className="p-4">
				<Outlet />
			</Container>
		</>
	);
}

export default AppLayout;
