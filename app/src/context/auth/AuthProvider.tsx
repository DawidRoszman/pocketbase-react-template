import UserRegisterDto from '@/models/UserRegisterDto';
import { AuthRecord } from 'pocketbase';
import { useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import pb from '@/db/conn';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [user, setUser] = useState<AuthRecord | null>(
    pb.authStore.record || null
  );

  const getUser = useMemo(() => {
    const login = async (email: string, password: string) => {
      const authData = await pb
        .collection('users')
        .authWithPassword(email, password);
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
    };
    return { isLoggedIn, user, login, logout, register };
  }, [user, isLoggedIn]);

  return (
    <AuthContext.Provider value={getUser}>{children}</AuthContext.Provider>
  );
};
