import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const EmptyIcon = styled.View`
  margin-bottom: 16px;
  opacity: 0.6;
`;

export const Message = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 8px;
`;

export const SubMessage = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  opacity: 0.8;
`;