import api from './api';

export const fetchDrivers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    throw error;
  }
};
