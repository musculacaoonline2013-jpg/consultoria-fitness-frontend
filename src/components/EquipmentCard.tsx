// src/components/EquipmentCard.tsx (Atualizado)

import Image from 'next/image'; // Importar o componente Image do Next.js
// ... (outros imports)

// ...

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, isSelected, onToggle }) => {
  return (
    <div
      // ... (classes e lógica de clique)
      onClick={() => onToggle(equipment.id)}
    >
      <div className="relative h-24 overflow-hidden rounded-md mb-2">
        <Image
          src={equipment.imageUrl} // Ex: '/images/cadeira_extensora.jpg'
          alt={equipment.name}
          layout="fill" // Faz a imagem cobrir o div
          objectFit="cover" // Garante que a imagem preencha sem distorcer
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* ... (resto do conteúdo) */}
    </div>
  );
};