import UserRegisterDto from '@/models/UserRegisterDto';
import { AuthRecord } from 'pocketbase';
import { createContext } from 'react';


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


