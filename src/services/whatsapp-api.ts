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
