'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Container, MainContent } from '../styles/globals';
import { fetchDrivers } from '@/services/whatsapp-api';
import DriverTable from '../components/DriverTable';
import DateFilterForm from '../components/DateFilterForm';
import ActionButtons from '../components/ActionButtons';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadDrivers = async (startDate: string | null = null, endDate: string | null = null) => {
    setLoading(true);
    try {
      const data = await fetchDrivers(startDate, endDate);
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

  const handleExport = () => {
    console.log('drivers: ', drivers);
    console.log('Exportando dados...', startDate, endDate);
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold">Gerenciamento de motoristas</h1>
        <DateFilterForm
          startDate={startDate} // No formato AAAA-MM-DD
          endDate={endDate} // No formato AAAA-MM-DD
          onStartDateChange={(date) => setStartDate(date)} // Não converta novamente
          onEndDateChange={(date) => setEndDate(date)} // Não converta novamente
          onSearch={handleSearch}
          onClear={handleClearDates}
        />

        <ActionButtons onUpdate={handleUpdateDrivers} onExport={handleExport} />
        <DriverTable drivers={drivers} loading={loading} />
      </MainContent>
    </Container>
  );
}
