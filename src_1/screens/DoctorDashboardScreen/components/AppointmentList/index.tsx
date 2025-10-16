import React from 'react';
import { ListItem } from 'react-native-elements';
import StatusBadge from '../StatusBadge';
import ActionButtons from '../ActionButtons';
import { LoadingText, EmptyText, AppointmentCard } from '../../styles';
import { Appointment } from '../../../../types/appointment';

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
  onUpdateStatus: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  loading,
  onUpdateStatus
}) => {
  if (loading) {
    return <LoadingText>Carregando consultas...</LoadingText>;
  }

  if (appointments.length === 0) {
    return <EmptyText>Nenhuma consulta agendada</EmptyText>;
  }

  return (
    <>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id}>
          <ListItem.Content>
            <ListItem.Title style={styles.dateTime}>
              {appointment.date} às {appointment.time}
            </ListItem.Title>
            
            <StatusBadge status={appointment.status} />
            
            {appointment.status === 'pending' && (
              <ActionButtons
                appointmentId={appointment.id}
                onUpdateStatus={onUpdateStatus}
              />
            )}
          </ListItem.Content>
        </AppointmentCard>
      ))}
    </>
  );
};

const styles = {
  dateTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
};

export default AppointmentList;