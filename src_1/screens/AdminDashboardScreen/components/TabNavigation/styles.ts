import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.surface};
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.border};
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: ${props => 
    props.active ? theme.colors.primary : 'transparent'
  };
  border-radius: 8px;
`;

export const TabIcon = styled.View<{ active: boolean }>`
  margin-right: 8px;
`;

export const TabText = styled.Text<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : theme.colors.text};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 14px;
`;