import styled from 'styled-components/native';
import { FlatList } from 'react-native';
// Adjust the import path if 'theme' is located elsewhere, for example:
import theme from '../../styles/theme';
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

export const AppointmentList = styled(FlatList)`
  flex: 1;
`;