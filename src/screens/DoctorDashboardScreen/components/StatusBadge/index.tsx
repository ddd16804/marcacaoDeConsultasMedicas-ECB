import React from 'react';
import { StatusBadgeContainer, StatusText } from './styles';
import { getStatusColor, getStatusText } from '../../utils/appointmentUtils';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const color = getStatusColor(status);
  const text = getStatusText(status);

  return (
    <StatusBadgeContainer status={status} color={color}>
      <StatusText status={status} color={color}>
        {text}
      </StatusText>
    </StatusBadgeContainer>
  );
};

export default StatusBadge;