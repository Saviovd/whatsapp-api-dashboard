export const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone: string): string => {
  const cleanedPhone = phone.replace(/\D/g, '').replace(/^55/, '');

  let match;
  if (cleanedPhone.length === 10) {
    match = cleanedPhone.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]} 9${match[2]}-${match[3]}`;
    }
  }

  if (cleanedPhone.length === 11) {
    match = cleanedPhone.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
    }
  }

  return phone;
};

export const formatDate = (date?: string): string => {
  if (!date) {
    return 'Data não definida';
  }
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
