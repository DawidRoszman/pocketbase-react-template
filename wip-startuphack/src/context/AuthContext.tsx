import { createContext, useMemo, useState } from 'react'
import PocketBase, { AuthRecord } from 'pocketbase';
import UserRegisterDto from '../models/UserRegisterDto';

const pb = new PocketBase('http://127.0.0.1:8090');

export const AuthContext = createContext<{
    isLoggedIn: boolean;
    user: AuthRecord | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userRegisterDto: UserRegisterDto) => Promise<void>;
}>({
    isLoggedIn: false,
    user: null,
    login: async () => { },
    logout: () => { },
    register: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
    const [user, setUser] = useState<AuthRecord | null>(pb.authStore.record || null);

    const login = async (email: string, password: string) => {
        const authData = await pb.collection('users').authWithPassword(email, password);
        setUser(authData.record);
        setIsLoggedIn(pb.authStore.isValid);
    };

    const logout = () => {
        pb.authStore.clear();
        setIsLoggedIn(pb.authStore.isValid);
        window.location.reload();
    };

    const register = async (userRegisterDto: UserRegisterDto) => {
        await pb.collection('users').create(userRegisterDto);
    }

    const getUser = useMemo(() => {
        return { isLoggedIn, user, login, logout, register };
    }, [user, isLoggedIn, login, logout, register]);

    return (
        <AuthContext.Provider value={getUser}>
            {children}
        </AuthContext.Provider>
    );
};
