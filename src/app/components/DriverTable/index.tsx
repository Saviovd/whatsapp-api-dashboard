import { Driver } from '@/types/driver';
import { formatCPF, formatDate, formatPhone } from '@/utils/format';
import React from 'react';

interface TableProps {
  drivers: Driver[];
  loading: boolean;
}

const DriverTable: React.FC<TableProps> = ({ drivers, loading }) => {
  if (loading) {
    return <p>Carregando motoristas...</p>;
  }

  if (drivers.length === 0) {
    return <p>Nenhum motorista encontrado.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Nome</th>
          <th className="border border-gray-300 px-4 py-2">Telefone</th>
          <th className="border border-gray-300 px-4 py-2">CPF</th>
          <th className="border border-gray-300 px-4 py-2">Data de Registro</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Questionário</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver._id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{driver.name}</td>
            <td className="border border-gray-300 px-4 py-2">{formatPhone(driver.phone)}</td>
            <td className="border border-gray-300 px-4 py-2">{formatCPF(driver.cpf)}</td>
            <td className="border border-gray-300 px-4 py-2">{formatDate(driver.registerDate!)}</td>
            <td className="border border-gray-300 px-4 py-2">
              {driver.finalized ? 'Finalizado' : 'Em andamento'}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {driver.questionnaire.length > 0 ? (
                <details>
                  <summary className="cursor-pointer">Ver Respostas</summary>
                  <ul className="mt-2 text-sm">
                    {driver.questionnaire.map((q) => (
                      <li key={q.question}>
                        <p>
                          <strong>Pergunta:</strong> {q.question}
                        </p>
                        <p>
                          <strong>Resposta:</strong> {q.answer}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                'Nenhum questionário preenchido'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
