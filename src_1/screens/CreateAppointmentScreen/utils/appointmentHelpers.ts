import { User, Doctor } from '../../types/appointment';

export const convertUsersToDoctors = (users: User[]): Doctor[] => {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    specialty: user.role === 'doctor' && 'specialty' in user 
      ? user.specialty 
      : 'Especialidade não informada',
    image: user.image || ''
  }));
};

export const validateAppointmentData = (date: string, time: string, doctor: Doctor | null): string | null => {
  if (!date || !time || !doctor) {
    return 'Por favor, preencha a data e selecione um médico e horário';
  }

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(date)) {
    return 'Formato de data inválido. Use DD/MM/AAAA';
  }

  return null;
};