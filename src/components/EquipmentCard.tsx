'use client';

import React from 'react';
import Image from 'next/image';

export interface Equipment {
  id: string;
  name: string;
  imageUrl: string;
  // Se tiver mais campos no futuro, adiciona aqui:
  // description?: string;
  // category?: string;
}

export interface EquipmentCardProps {
  equipment: Equipment;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(equipment.id)}
      className={`
        cursor-pointer rounded-lg border p-3 transition
        ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}
      `}
    >
      <div className="relative mb-2 h-24 w-full overflow-hidden rounded-md">
        <Image
          src={equipment.imageUrl}        // ex: '/images/cadeira_extensora.jpg'
          alt={equipment.name}
          fill                             // substitui layout="fill"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="text-sm font-semibold text-gray-800">
        {equipment.name}
      </div>
    </div>
  );
};

export default EquipmentCard;
