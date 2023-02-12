import "./App.css";
import CustomDatatable from "./components/CustomDatatable/CustomDatatable";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<CustomDatatable />
		</div>
	);
}

export default App;
