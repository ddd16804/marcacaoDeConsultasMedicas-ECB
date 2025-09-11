import React from 'react';
import { ButtonsContainer, ActionButtonContainer, ActionButtonText } from './styles';

interface ActionButtonsProps {
  appointmentId: string;
  onUpdateStatus: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  appointmentId,
  onUpdateStatus
}) => {
  return (
    <ButtonsContainer>
      <ActionButtonContainer
        variant="confirm"
        onPress={() => onUpdateStatus(appointmentId, 'confirmed')}
        activeOpacity={0.7}
      >
        <ActionButtonText>Confirmar</ActionButtonText>
      </ActionButtonContainer>
      
      <ActionButtonContainer
        variant="cancel"
        onPress={() => onUpdateStatus(appointmentId, 'cancelled')}
        activeOpacity={0.7}
      >
        <ActionButtonText>Cancelar</ActionButtonText>
      </ActionButtonContainer>
    </ButtonsContainer>
  );
};

export default ActionButtons;