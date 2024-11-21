import React, { useEffect, useState } from 'react';
import { Driver } from '@/types/driver';
import { motion, AnimatePresence } from 'framer-motion';

interface SortDriverListProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  allDrivers: Driver[];
}

const SortDriverList: React.FC<SortDriverListProps> = ({ setDrivers, allDrivers }) => {
  const [sortFilter, setSortFilter] = useState<'dateDesc' | 'dateAsc' | 'alphabetical' | ''>('');
  const [statusFilter, setStatusFilter] = useState<'finished' | 'inProgress' | ''>('');
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const applyFilters = () => {
    let filteredDrivers = [...allDrivers];

    // sort
    if (sortFilter === 'dateDesc') {
      filteredDrivers.sort(
        (a, b) => new Date(b.registerDate || 0).getTime() - new Date(a.registerDate || 0).getTime()
      );
    } else if (sortFilter === 'dateAsc') {
      filteredDrivers.sort(
        (a, b) => new Date(a.registerDate || 0).getTime() - new Date(b.registerDate || 0).getTime()
      );
    } else if (sortFilter === 'alphabetical') {
      filteredDrivers.sort((a, b) => a.name.localeCompare(b.name));
    }

    // filter by status
    if (statusFilter === 'finished') {
      filteredDrivers = filteredDrivers.filter((driver) => driver.finalized === true);
    } else if (statusFilter === 'inProgress') {
      filteredDrivers = filteredDrivers.filter((driver) => driver.finalized === false);
    }

    setDrivers(filteredDrivers);
  };

  const handleSortFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'dateDesc' | 'dateAsc' | 'alphabetical' | '';
    setSortFilter(value);

    const filters = appliedFilters.filter((filter) => !filter.startsWith('Ordenar:'));
    if (value) {
      filters.push(`Ordenar: ${e.target.options[e.target.selectedIndex].text}`);
    }
    setAppliedFilters(filters);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'finished' | 'inProgress' | '';
    setStatusFilter(value);

    const filters = appliedFilters.filter((filter) => !filter.startsWith('Status:'));
    if (value) {
      filters.push(`Status: ${e.target.options[e.target.selectedIndex].text}`);
    }
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setSortFilter('');
    setStatusFilter('');
    setAppliedFilters([]);
    setDrivers(allDrivers);
  };

  useEffect(() => {
    applyFilters();
  }, [sortFilter, statusFilter]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select
            className="p-2 border rounded"
            value={sortFilter}
            onChange={handleSortFilterChange}
          >
            <option value="">Ordenar por</option>
            <option value="dateDesc">Data: Maior para Menor</option>
            <option value="dateAsc">Data: Menor para Maior</option>
            <option value="alphabetical">Ordem Alfabética</option>
          </select>
          <select
            className="p-2 border rounded"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">Status</option>
            <option value="finished">Finalizado</option>
            <option value="inProgress">Em Andamento</option>
          </select>
          {(sortFilter || statusFilter) && (
            <button className="p-2 bg-red-500 text-white rounded" onClick={handleClearFilters}>
              Limpar Filtro
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {appliedFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 flex flex-col items-start overflow-hidden"
          >
            <p className="font-semibold">Filtros Aplicados:</p>
            <ul className="list-disc pl-4 flex gap-1">
              {appliedFilters.map((filter, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.1 }}
                  key={index}
                  className="bg-sky-600 py-1 px-2 rounded-lg overflow-hidden"
                >
                  {filter}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDriverList;
