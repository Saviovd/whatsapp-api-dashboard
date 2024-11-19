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

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold">Gerenciamento de motoristas</h1>
        <DriverTable drivers={drivers} loading={loading} />
      </MainContent>
    </Container>
  );
}
