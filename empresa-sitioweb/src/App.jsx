import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes";

function App() {
	const router = createBrowserRouter(routesConfig);

	return <RouterProvider router={router} />;
}

export default App;
