import theme from '../../../styles/theme';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

export const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

export const canUpdateStatus = (status: AppointmentStatus): boolean => {
  return status === 'pending';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};