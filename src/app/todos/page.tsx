import { Metadata } from "next";
import TodosClient from "./TodosClient";

export const metadata: Metadata = {
  title: "todos",
  description: "To-do List",
};

export default function TodosPage() {
  return <TodosClient />;
}
