"use client";

import { User } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

type UserWithoutPassword = Omit<User, "password"> | null;

interface AuthContextType {
  user: UserWithoutPassword;
  setUser: (user: UserWithoutPassword) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithoutPassword>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용되어야 합니다.");
  }
  return context;
}
