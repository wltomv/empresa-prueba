import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
	const router = createBrowserRouter(routesConfig);
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />
		</>
	);
}

export default App;
