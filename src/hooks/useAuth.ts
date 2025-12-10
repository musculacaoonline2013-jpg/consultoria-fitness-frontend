'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setAuthState({ isAuthenticated: true, isLoading: false, token });
    } else {
      setAuthState({ isAuthenticated: false, isLoading: false, token: null });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({ isAuthenticated: false, isLoading: false, token: null });
    router.push('/login');
  };

  return { ...authState, logout };
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

if (isLoading || !isAuthenticated) {
    // Removemos os parênteses ( ) para evitar o erro de parsing
    return <div className="p-8 text-center text-gray-500">Carregando...</div>;
  }

  // Solução de retorno final (DIV simples)
  return <>{children}</>;
};
