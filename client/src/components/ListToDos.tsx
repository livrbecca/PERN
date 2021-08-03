import { useState, useEffect } from "react";
import { TodoStateProps } from "../utils/interface";
import EditToDo from "./EditToDo";

const ListToDos = () => {
  const [todos, setTodos] = useState<TodoStateProps[]>([]);

  const deleteToDo = async (id: number) => {
    try {
      const deleted = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData: TodoStateProps[] = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>List Todos</h1>
      <table className="table mt-t text center">
        <thead>
          <tr>
            <th>Descriptions</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          s<td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                {" "}
                <EditToDo todo={todo}/>
              </td>
              <td>
                {" "}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteToDo(todo.todo_id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListToDos;
