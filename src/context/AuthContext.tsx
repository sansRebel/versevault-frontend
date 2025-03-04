"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("The context is empty. useAuth must be used within AuthProvider")
    }
    return context;
}