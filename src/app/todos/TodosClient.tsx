"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import { error } from "console";
import TodoCard from "./TodoCard";

export default function TodosClient() {
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const { user } = useAuth();

  const router = useRouter();

  const fetchTodos = async () => {
    try {
      if (!user) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todos?user-id=${user.id}`);
      const json = await res.json();

      if (json.success) {
        setTodos(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || newTodo.trim() === "") return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todos`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newTodo, userId: user.id }),
      });
      const json = await res.json();

      setTodos([...todos, json.data]); //새로운 배열을 만들어서 할 일 목록을 추가하자마자 갱신
      setNewTodo("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      alert("로그인해주셈");
      router.push("/");
    }
  }, [user]);

  return (
    <main className="inner-container">
      <h1 className="h1-style my-4">할 일 목록</h1>
      <form className="mt-6 w-full max-w-md flex space-x-2" onSubmit={addTodo}>
        <input className="input-style" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className="button-style " type="submit">
          추가
        </button>
      </form>
      <ul className=" mt-8 w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      </ul>
    </main>
  );
}
