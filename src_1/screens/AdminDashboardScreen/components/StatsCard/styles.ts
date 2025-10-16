import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.surface};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const IconContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const StatsNumber = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

export const StatsLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

export const TrendText = styled.Text<{ positive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => 
    props.positive ? theme.colors.success : theme.colors.error
  };
`;