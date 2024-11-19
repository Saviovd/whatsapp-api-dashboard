'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Container, MainContent } from '../styles/globals';
import { fetchDrivers } from '@/services/whatsapp-api';
import DriverTable from '../components/DriverTable';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchDrivers();
        setDrivers(data.drivers);
      } catch (error) {
        console.error('Erro ao carregar motoristas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, []);

  const handleUpdateDrivers = async () => {
    setLoading(true);
    try {
      const data = await fetchDrivers();
      setDrivers(data.drivers);
    } catch (error) {
      console.error('Erro ao atualizar motoristas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    console.log('Exportando dados...');
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold">Gerenciamento de motoristas</h1>

        <div className="flex justify-end gap-2 items-center mt-4">
          <button
            onClick={handleUpdateDrivers}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Atualizar Lista
          </button>

          <button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Exportar
          </button>
        </div>

        <DriverTable drivers={drivers} loading={loading} />
      </MainContent>
    </Container>
  );
}
