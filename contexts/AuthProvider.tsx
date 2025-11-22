"use client"


import { NextResponse } from 'next/server';
import {useContext, useEffect, useState, createContext, Dispatch, SetStateAction} from 'react'
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: (() => {}) as Dispatch<SetStateAction<boolean>>,
  logout: () => {}
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
    useEffect(() => {
      const fetchAuth = async () => {
        try {
          const res = await fetch('/api/auth/signIn', { method: 'GET', credentials: 'include' });
          if (!res.ok) {
            setIsAuthenticated(false);
            return;
          }

         
          let data: any = null;
          try {
            data = await res.json();
           
          } catch {
            data = null;
          }

          if (data?.user) {      
            setIsAuthenticated(true);
            return;
          }
        } catch (err) {
          setIsAuthenticated(false);
        }
      };

      fetchAuth();
    }, []);

    const logout = async () => {
      const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      if(res.ok){
        setIsAuthenticated(false);
        router.push('/shop');
      }
    }
  return (
    <AuthContext.Provider value={{isAuthenticated, logout, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
  )
}

