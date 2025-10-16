import theme from '../../../styles/theme';
import { Appointment } from '../../../types/appointments';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

export const filterDoctorAppointments = (appointments: Appointment[], doctorId: string): Appointment[] => {
  return appointments.filter(appointment => appointment.doctorId === doctorId);
};