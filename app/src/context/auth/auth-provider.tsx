import pb from '@/db/conn';
import UserRegisterDto from '@/models/dto/user-register-dto';
import { AuthRecord } from 'pocketbase';
import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [user, setUser] = useState<AuthRecord | null>(
    pb.authStore.record || null
  );

  useEffect(() => {
    const authRefresh = async () => {
      const authData = await pb.collection('users').authRefresh();
      console.log(authData);
      setUser(authData.record);
      setIsLoggedIn(pb.authStore.isValid);
    };
    authRefresh();
  }, []);

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
