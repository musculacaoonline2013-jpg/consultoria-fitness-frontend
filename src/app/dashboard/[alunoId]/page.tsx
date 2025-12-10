// src/app/onboarding/[alunoId]/page.tsx
'use client';

import { ProtectedRoute } from '@/hooks/useAuth'; // Importa a proteção de rota
import WizardForm from '@/components/WizardForm'; // Importa o componente central
import { useParams } from 'next/navigation';

const OnboardingPage = () => {
    // 1. Extrai o parâmetro dinâmico da URL
    const params = useParams();
    // O Next.js retorna os parâmetros como string ou array de strings
    const alunoId = Array.isArray(params.alunoId) ? params.alunoId[0] : params.alunoId;

    if (!alunoId) {
        return <div className="p-8 text-center text-red-500">ID do Aluno não encontrado na URL.</div>;
    }

    // 2. Renderiza o Wizard, passando o ID
    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold pt-10 text-center text-indigo-800">
                Ficha de Avaliação (Aluno ID: {alunoId})
            </h1>
            <WizardForm alunoId={alunoId} />
        </div>
    );
};

// 3. Protege a página para garantir que apenas professores logados a acessem
export default function ProtectedOnboardingPage() {
    // Nota: É crucial que o useAuth.ts esteja configurado com o alias @/hooks/useAuth
    // ou use o caminho relativo correto: '../../hooks/useAuth'
    return (
        <ProtectedRoute>
            <OnboardingPage />
        </ProtectedRoute>
    );
}