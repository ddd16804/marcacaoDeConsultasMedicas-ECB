import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const DoctorContainer = styled.View`
  margin-bottom: 15px;
`;

export const DoctorListContainer = styled.View`
  margin-top: 10px;
`;

export const DoctorCard = styled.TouchableOpacity`
  background-color: ${theme.colors.cardBackground};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const DoctorName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 5px;
`;

export const DoctorSpecialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;