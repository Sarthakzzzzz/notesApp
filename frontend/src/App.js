import logo from "./logo.svg";
import "./App.css";
import Noteslist from "./components/Noteslist";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      <Login />
      <Noteslist />
      <Register />
    </div>
  );
}

export default App;
