// src/components/AuthForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isRegister = type === 'register';
  const endpoint = isRegister ? '/auth/register' : '/auth/login';

  // Usar a variável de ambiente (ajustar .env.local primeiro!)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const dataToSend = isRegister ? { nome, email, senha } : { email, senha };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ocorreu um erro no servidor.');
        return;
      }
      
      if (type === 'login') {
        localStorage.setItem('authToken', data.token);
        router.push('/dashboard');
      } else {
        alert('Registro concluído! Faça login agora.');
        router.push('/login');
      }

    } catch (err) {
      setError('Falha na comunicação com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">{isRegister ? 'Registro' : 'Login'}</h1>
        
        {/* ... (renderização de erro e campos) ... */}

        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400">
          {loading ? 'Processando...' : (isRegister ? 'Cadastrar' : 'Entrar')}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;