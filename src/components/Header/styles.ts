import styled from 'styled-components/native';
import theme from '../../../styles/theme';

export const HeaderContainer = styled.View`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.medium}px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: bold;
`;