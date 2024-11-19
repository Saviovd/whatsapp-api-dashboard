import { Driver } from '@/types/driver';
import { formatCPF, formatDate, formatPhone } from '@/utils/format';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TableProps {
  drivers: Driver[];
  loading: boolean;
}

const DriverTable: React.FC<TableProps> = ({ drivers, loading }) => {
  const [openDetails, setOpenDetails] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 17;

  const totalPages = Math.ceil(drivers.length / driversPerPage);

  const toggleDetails = (driverId: string) => {
    setOpenDetails((prev) => (prev === driverId ? null : driverId));
  };

  const currentDrivers = drivers.slice(
    (currentPage - 1) * driversPerPage,
    currentPage * driversPerPage
  );

  if (loading) {
    return <p className="text-center text-gray-500">Carregando motoristas...</p>;
  }

  if (drivers.length === 0) {
    return <p className="text-center text-gray-500">Nenhum motorista encontrado.</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto mt-4 rounded-lg" style={{ minHeight: '740px' }}>
        <table className="min-w-full table-auto border-collapse shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Telefone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">CPF</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Data de Registro</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left w-96">Questionário</th>
            </tr>
          </thead>
          <tbody>
            {currentDrivers.map((driver, i) => (
              <tr key={i} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{driver.name}</td>
                <td className="border border-gray-300 px-4 py-2">{formatPhone(driver.phone)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatCPF(driver.cpf)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(driver.registerDate!)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        driver.finalized ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    ></span>
                    {driver.finalized ? 'Finalizado' : 'Em andamento'}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => toggleDetails(driver._id)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    {openDetails === driver._id ? 'Ocultar Respostas' : 'Ver Respostas'}
                  </button>
                  <AnimatePresence>
                    {openDetails === driver._id && (
                      <motion.ul
                        className="mt-2 text-sm space-y-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {driver.questionnaire.map((q, i) => (
                          <motion.li
                            key={i}
                            className="border-t pt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p>
                              <strong>Pergunta:</strong> {q.question}
                            </p>
                            <p>
                              <strong>Resposta:</strong> {q.answer}
                            </p>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default DriverTable;
