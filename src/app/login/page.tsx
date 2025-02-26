import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "로그인 - My NextJS App",
  description: "로그인을 통해 To-Do List 애플리케이션에 등록하세요.",
};

export default function LoginPage() {
  return <LoginClient />;
}
