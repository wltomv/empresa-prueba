import Navbar from "../components/Navbar/Navbar";
import Employees from "../pages/Employees/Employees";
import Palindrome from "../pages/Palindrome/Palindrome";
import CustomDatatable from "../components/CustomDatatable/CustomDatatable";
import AppLayout from "../containers/AppLayout/AppLayout";
import LoginPage from "../pages/LoginPage";
import RecoveryPassPage from "../pages/RecoveryPassPage";
import ChangePassPage from "../pages/ChangePassPage";
const routesConfig = [
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
	{
		path: "/auth/recoveryPass",
		element: <RecoveryPassPage />,
	},
	{
		path: "/auth/recoveryPass/change",
		element: <ChangePassPage />,
	},
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Employees />,
			},
			{
				path: "/palindromos",
				element: <Palindrome />,
			},
		],
	},
	{ path: "*", element: <h1>NOT FOUND</h1> },
];

export default routesConfig;
