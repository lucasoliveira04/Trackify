import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase/firebase";

interface AuthContextProps {
    user: User | null;
    token: string | null
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userToken = await authUser.getIdToken();
                setUser(authUser);
                setToken(userToken);
                sessionStorage.setItem("user", JSON.stringify({
                    displayName: authUser.displayName,
                    email: authUser.email,
                    token: userToken,
                }));
            } else {
                setUser(null);
                setToken(null);
                sessionStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userToken = await result.user.getIdToken();
            setUser(result.user);
            setToken(userToken);
            sessionStorage.setItem("user", JSON.stringify({
                displayName: result.user.displayName,
                email: result.user.email,
                token: userToken,
            }));
        } catch (error) {
            console.error("Erro ao fazer login com o Google:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.clear()
            window.location.href = "/";
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loginWithGoogle, logout }}>
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