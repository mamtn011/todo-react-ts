import AddToDo from "./components/AddToDo";
import Todos from "./components/Todos";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
  );
}

export default App;
