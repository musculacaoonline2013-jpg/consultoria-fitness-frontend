// src/components/WizardForm.tsx

import React, { useState } from 'react';
import Step1Profile from './forms/Step1Profile';
import Step2Training from './forms/Step2Training';
import Step3Equipment from './forms/Step3Equipment';
import Step4Health from './forms/Step4Health';
import Step5Nutrition from './forms/Step5Nutrition';

// Defina a estrutura de dados (simplificada)
interface FormData {
  nome: string;
  email: string;
  peso: number | null;
  objetivo: string;
  equipamentos: string[];
  // ... (muitos outros campos)
}

const steps = [
  Step1Profile,
  Step2Training,
  Step3Equipment,
  Step4Health,
  Step5Nutrition,
];

interface WizardProps {
    alunoId: string; // ID do aluno sendo avaliado
}

const WizardForm: React.FC<WizardProps> = ({ alunoId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ 
      nome: '', 
      email: '', 
      peso: null, 
      objetivo: '', 
      equipamentos: [] 
      // Inicialize todos os seus campos de forma segura aqui
  });

  const CurrentComponent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Função para atualizar dados e salvar como rascunho no backend
  const handleUpdate = (data: Partial<FormData>) => {
    // 1. Atualiza o estado local
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    // 2. Salva o rascunho no Backend (A rota deve ser: POST /avaliacoes/[alunoId])
    // fetch(`/api/avaliacoes/${alunoId}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newFormData) 
    // }).then(res => console.log("Rascunho salvo!")); 
  };

  const handleSubmit = () => {
    if (isLastStep) {
      // Lógica final de SUBMISSÃO e notificação do professor
      alert('Avaliação Finalizada! Notificando o Professor...');
      // fetch(`/api/avaliacoes/${alunoId}/finalizar`, ...);
      // Aqui você enviaria o status para 'Aguardando Análise'
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
          Avaliação Inicial | Etapa {currentStep + 1} de {steps.length}
      </h2>
      
      {/* Barra de Progresso (Melhora o UX) */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Renderiza o componente da etapa atual */}
      <CurrentComponent formData={formData} onUpdate={handleUpdate} onSubmit={handleSubmit} />

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 text-white rounded ${isLastStep ? 'bg-green-600' : 'bg-indigo-600'}`}
        >
          {isLastStep ? 'Finalizar Avaliação' : 'Próxima Etapa'}
        </button>
      </div>
    </div>
  );
};

export default WizardForm;