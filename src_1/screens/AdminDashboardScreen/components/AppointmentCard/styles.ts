import styled from 'styled-components/native';
import theme from '../../../../styles/theme';
import { AppointmentStatus, getStatusColor } from '../../utils/statusHelpers';

export const Container = styled.View`
  background-color: ${theme.colors.surface};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 16px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const DoctorInfo = styled.View`
  flex: 1;
`;

export const DoctorName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

export const Specialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const DateTime = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

export const StatusBadge = styled.View<{ status: AppointmentStatus }>`
  background-color: ${props => getStatusColor(props.status) + '20'};
  padding: 6px 12px;
  border-radius: 20px;
  margin-left: 12px;
`;

export const StatusText = styled.Text<{ status: AppointmentStatus }>`
  color: ${props => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 600;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant: 'confirm' | 'cancel' }>`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  margin-horizontal: 4px;
  background-color: ${props => 
    props.variant === 'confirm' ? theme.colors.success : theme.colors.error
  };
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;