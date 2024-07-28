import { ReactNode, createContext, useContext, useState } from "react";

//  type alias
export type TodoProviderProps = {
  children: ReactNode;
};
export type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};
export type TodoContext = {
  todo: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (todoId: string) => void;
  handleTodoDelete: (todoId: string) => void;
};

// create context
export const todoContext = createContext<TodoContext | null>(null);
// provide context
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todo, setTodo] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(savedTodos) as Todo[];
    } catch (err) {
      return [];
    }
  });
  // save new todo
  const handleAddToDo = (task: string) => {
    setTodo((prev) => {
      const newTodo: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          isCompleted: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  // mark completed
  const toggleTodoAsCompleted = (todoId: string) => {
    setTodo((prev) => {
      let newTodo = prev.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };
  // delete
  const handleTodoDelete = (todoId: string) => {
    setTodo((prev) => {
      let newTodo = prev.filter((todo) => todo.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  return (
    <todoContext.Provider
      value={{ todo, handleAddToDo, toggleTodoAsCompleted, handleTodoDelete }}
    >
      {children}
    </todoContext.Provider>
  );
};

// consumer

export const useTodo = () => {
  const todoConsumer = useContext(todoContext);
  if (!todoConsumer) {
    throw new Error("useTodo has been used outside of provider!");
  }
  return todoConsumer;
};
