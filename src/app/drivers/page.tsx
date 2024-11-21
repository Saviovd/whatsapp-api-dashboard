'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Container, MainContent } from '../styles/globals';
import { exportDrivers, fetchDrivers } from '@/services/whatsapp-api';
import DriverTable from '../components/DriverTable';
import DateFilterForm from '../components/DateFilterForm';
import ActionButtons from '../components/ActionButtons';
import SortDriverList from '../components/SortDriverList';
import { Driver } from '@/types/driver';

export default function Drivers() {
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadDrivers = async (startDate: string | null = null, endDate: string | null = null) => {
    setLoading(true);
    try {
      const data = await fetchDrivers(startDate, endDate);
      setAllDrivers(data.drivers);
      setDrivers(data.drivers);
    } catch (error) {
      console.error('Erro ao carregar motoristas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedStartDate = startDate ? startDate : null;
    const formattedEndDate = endDate ? endDate : null;
    loadDrivers(formattedStartDate, formattedEndDate);
  };

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
    loadDrivers();
  };

  const handleUpdateDrivers = async () => {
    loadDrivers();
  };

  const handleExport = async () => {
    try {
      const response = await exportDrivers({ drivers });
      const blob = response?.data;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `motoristas_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold">Gerenciamento de motoristas</h1>
        <DateFilterForm
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          onSearch={handleSearch}
          onClear={handleClearDates}
        />
        <div className="my-4 flex justify-between items-center">
          <SortDriverList allDrivers={allDrivers} drivers={drivers} setDrivers={setDrivers} />
          <ActionButtons onUpdate={handleUpdateDrivers} onExport={handleExport} />
        </div>
        <DriverTable drivers={drivers} loading={loading} />
      </MainContent>
    </Container>
  );
}
