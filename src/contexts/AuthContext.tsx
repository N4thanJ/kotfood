// contexts/AuthContext.tsx
'use client';
import { User } from '@/types';
import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';

interface AuthContextType {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR('/api/auth/ping', fetcher);

  const user = data?.user ?? null;

  return (
    <>
      <AuthContext.Provider value={{ user, isLoading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
