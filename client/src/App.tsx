import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InputToDo from "./components/InputToDo";
import ListToDos from "./components/ListToDos";

function App() {
  return (
    <>
      <div className="container">
        <InputToDo />
        <ListToDos />
      </div>
    </>  );
}

export default App;
