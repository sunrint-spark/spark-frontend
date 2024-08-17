import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthRequired from "@/pages/AuthRequired.tsx";
import Api from "@/lib/api";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthWrapper');
    }
    return context;
};

// Props 타입 정의
interface AuthWrapperProps {
    children: ReactNode;
}

// AuthWrapper 컴포넌트
const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    const checkToken = async (): Promise<boolean> => {
        if (!token) {
            return false;
        }
        if(localStorage.getItem('@devModeOptions') !== "noAuth") {
            return true;
        }
        Api.setToken(token)
        try {
            const response = await Api.getProfile() as Record<string, Record<string, string>>
            localStorage.setItem('user', JSON.stringify(response.data))
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;

    };

    const authContextValue: AuthContextType = {
        token,
        login,
        logout
    };

    if (!token || !checkToken()) {
        return <AuthRequired />;
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthWrapper, useAuth };