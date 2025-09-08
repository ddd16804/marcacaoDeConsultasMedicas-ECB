import React from 'react';
import { Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Appointment } from '../../../../types/navigation';
import { AppointmentStatus, canUpdateStatus, formatDate } from '../../utils/statusHelpers';
import {
  Container,
  Header,
  DoctorInfo,
  DoctorName,
  Specialty,
  DateTime,
  StatusBadge,
  StatusText,
  ActionContainer,
  ActionButton,
  ActionButtonText
} from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusUpdate: (id: string, status: AppointmentStatus) => Promise<void>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStatusUpdate
}) => {
  const handleStatusUpdate = (newStatus: AppointmentStatus) => {
    Alert.alert(
      'Confirmar Ação',
      `Deseja realmente ${newStatus === 'confirmed' ? 'confirmar' : 'cancelar'} esta consulta?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => onStatusUpdate(appointment.id, newStatus) 
        }
      ]
    );
  };

  return (
    <Container>
      <Header>
        <DoctorInfo>
          <DoctorName>{appointment.doctorName}</DoctorName>
          <Specialty>{appointment.specialty}</Specialty>
          <DateTime>
            {formatDate(appointment.date)} às {appointment.time}
          </DateTime>
        </DoctorInfo>
        
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
      </Header>
      
      {canUpdateStatus(appointment.status) && (
        <ActionContainer>
          <ActionButton 
            variant="confirm" 
            onPress={() => handleStatusUpdate('confirmed')}
          >
            <ActionButtonText>Confirmar</ActionButtonText>
          </ActionButton>
          
          <ActionButton 
            variant="cancel" 
            onPress={() => handleStatusUpdate('cancelled')}
          >
            <ActionButtonText>Cancelar</ActionButtonText>
          </ActionButton>
        </ActionContainer>
      )}
    </Container>
  );
};

// Helper function (could be moved to utils)
const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed': return 'Confirmada';
    case 'cancelled': return 'Cancelada';
    default: return 'Pendente';
  }
};

export default AppointmentCard;