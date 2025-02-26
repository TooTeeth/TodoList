import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface TodoCardProps {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoCard({ todo, todos, setTodos }: TodoCardProps) {
  const deleteTodo = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todos/${todo.id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.success) {
        setTodos(todos.filter((v) => v.id !== todo.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="flex justify-between items-center p-3 border rounded bg-white">
      <span>{todo.content}</span>
      <button className="px-2 py-1 text-sm rounded hover:bg-sky-300 border transition" onClick={() => deleteTodo()}>
        삭제
      </button>
    </li>
  );
}
