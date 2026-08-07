import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, [token]);

    // Login
    const login = async (credentials) => {
        const response = await loginRequest(credentials);

        if (response.status) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            setToken(response.token);
            setUser(response.user);

            return {
                success: true,
            };
        }

        return {
            success: false,
            message: response.message,
        };
    };
    // Register
    const register = ({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);