// src/app/dashboard/page.tsx
'use client';

import { useAuth, ProtectedRoute } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Aluno {
    id: number;
    nome: string;
    email: string;
    objetivo: string;
}

const DashboardPage = () => {
    const { token, logout } = useAuth();
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            fetchAlunos();
        }
    }, [token]);

    const fetchAlunos = async () => {
        setLoadingData(true);
        setError('');
        try {
            // A rota /alunos é protegida e usa o token para isolamento Multi-Tenant!
            const response = await fetch('http://localhost:3000/alunos', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                // Se o backend disser que o token é inválido (401), fazemos logout
                if (response.status === 401) logout();
                throw new Error(data.error || 'Falha ao buscar alunos.');
            }

            setAlunos(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoadingData(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-indigo-700">Bem-vindo, Professor!</h1>
                <div>
                    <button 
                        onClick={logout} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                        Sair
                    </button>
                </div>
            </header>

            <h2 className="text-2xl font-semibold mb-4">Meus Alunos ({alunos.length})</h2>

            {loadingData && <p className="text-center text-indigo-500">Carregando lista de alunos...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <Link href="/onboarding/novo" className="bg-green-600 text-white px-4 py-2 rounded inline-block mb-6 hover:bg-green-700">
                + Novo Aluno
            </Link>

            {/* Tabela de Alunos */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{aluno.nome} ({aluno.email})</td>
                                <td className="px-6 py-4 whitespace-nowrap">{aluno.objetivo || 'Não Definido'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Aguardando Avaliação</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/onboarding/${aluno.id}`} className="text-indigo-600 hover:text-indigo-900">
                                        Ver Ficha
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {!loadingData && alunos.length === 0 && !error && (
                <p className="text-center mt-10 text-gray-500">Nenhum aluno cadastrado. Comece adicionando um novo!</p>
            )}

        </div>
    );
};

// Envolve a página com o componente de proteção
export default function ProtectedDashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    );
}