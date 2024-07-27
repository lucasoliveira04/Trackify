import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase/firebase";

interface AuthContextProps {
    user: User | null;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const storedUser = sessionStorage.getItem("user")

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser)
                sessionStorage.setItem("user", JSON.stringify({
                    displayName: authUser.displayName,
                    email: authUser.email
                }))
            } else {
                setUser(null)
                sessionStorage.removeItem("user")
            }
        })

        return () => unsubscribe()
    }, [])

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);

            sessionStorage.setItem("user", JSON.stringify({
                displayName: user?.displayName,
                email: user?.email
            }))
        } catch (error) {
            console.error("Erro ao fazer login com o Google:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
