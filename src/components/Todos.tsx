import { useSearchParams } from "react-router-dom";
import { useTodo } from "../store/todo";

const Todos = () => {
  const { todo, toggleTodoAsCompleted, handleTodoDelete } = useTodo();
  const [searchParams] = useSearchParams();
  let todos̥Data = searchParams.get("todos");

  let filteredData = todo;

  if (todos̥Data === "active") {
    filteredData = filteredData.filter((task) => !task.isCompleted);
  }

  if (todos̥Data === "completed") {
    filteredData = filteredData.filter((task) => task.isCompleted);
  }
  return (
    <ul className="main-task">
      {filteredData.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => toggleTodoAsCompleted(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {todo.isCompleted && (
              <button type="button" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
