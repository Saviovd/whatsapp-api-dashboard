import React from 'react';

interface ActionButtonsProps {
  onUpdate: () => void;
  onExport: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onUpdate, onExport }) => {
  return (
    <div className="flex justify-end gap-2 items-center">
      <button onClick={onUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Atualizar Lista
      </button>
      <button onClick={onExport} className="bg-green-500 text-white px-4 py-2 rounded-md">
        Exportar
      </button>
    </div>
  );
};

export default ActionButtons;
