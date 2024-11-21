import { Driver } from '@/types/driver';
import api from './api';

export const fetchDrivers = async (
  startDate: string | null = null,
  endDate: string | null = null
) => {
  try {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    const response = await api.get(`/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    throw error;
  }
};

export const exportDrivers = async (data: { drivers: Driver[] }) => {
  try {
    const response = await api.post('/export-users', data, {
      responseType: 'blob',
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error('Erro ao exportar motoristas:', error);
    throw error;
  }
};
