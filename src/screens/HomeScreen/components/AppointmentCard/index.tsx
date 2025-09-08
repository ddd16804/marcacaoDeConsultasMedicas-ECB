import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { Appointment } from '../../../../../types/appointments';
import { User } from '../../../../../types/auth';
import {
  Container,
  DoctorImage,
  SkeletonImage,
  InfoContainer,
  DoctorName,
  DoctorSpecialty,
  DateTime,
  Description,
  Status,
  ActionButtons,
  ActionButton,
  SkeletonButton,
  SkeletonText
} from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  doctor?: User;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointment: Appointment) => void;
  loading?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  doctor,
  onEdit,
  onDelete,
  loading = false
}) => {
  const handleEdit = () => onEdit?.(appointment);
  const handleDelete = () => onDelete?.(appointment);

  const getDoctorSpecialty = (): string => {
    if (doctor?.role === 'doctor' && 'specialty' in doctor) {
      return doctor.specialty;
    }
    return 'Especialidade não encontrada';
  };

  if (loading) {
    return (
      <Container>
        <SkeletonImage />
        <InfoContainer>
          <SkeletonText width="70%" />
          <SkeletonText width="50%" />
          <SkeletonText width="60%" />
          <SkeletonText width="80%" />
          <ActionButtons>
            <SkeletonButton />
            <SkeletonButton />
          </ActionButtons>
        </InfoContainer>
      </Container>
    );
  }

  return (
    <Container>
      <DoctorImage source={{ uri: doctor?.image || 'https://via.placeholder.com/100' }} />
      <InfoContainer>
        <DoctorName>{doctor?.name || 'Médico não encontrado'}</DoctorName>
        <DoctorSpecialty>{getDoctorSpecialty()}</DoctorSpecialty>
        <DateTime>{new Date(appointment.date).toLocaleDateString()} - {appointment.time}</DateTime>
        <Description>{appointment.description}</Description>
        <Status status={appointment.status}>
          {appointment.status === 'pending' ? 'Pendente' : 'Confirmado'}
        </Status>
        <ActionButtons>
          <ActionButton onPress={handleEdit}>
            <Icon name="edit" type="material" size={20} color="#6200ee" />
          </ActionButton>
          <ActionButton onPress={handleDelete}>
            <Icon name="delete" type="material" size={20} color="#b00020" />
          </ActionButton>
        </ActionButtons>
      </InfoContainer>
    </Container>
  );
};

export default AppointmentCard;