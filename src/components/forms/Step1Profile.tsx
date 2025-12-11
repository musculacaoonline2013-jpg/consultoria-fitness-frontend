'use client';

import React from 'react';

type Step1ProfileProps = {
  [key: string]: any; // aceita qualquer prop por enquanto
};

const Step1Profile: React.FC<Step1ProfileProps> = (props) => {
  return (
    <div>
      {/* Passo 1 - Perfil do aluno */}
      <p>Formulário - Passo 1 (Perfil)</p>
    </div>
  );
};

export default Step1Profile;
