import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
  gap: 10px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant: 'edit' | 'delete' }>`
  flex: 1;
  background-color: ${props => 
    props.variant === 'edit' ? theme.colors.primary : theme.colors.error};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: ${props => 
    props.variant === 'edit' ? theme.colors.primary : theme.colors.error};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
`;

export const ActionButtonText = styled.Text`
  color: ${theme.colors.white};
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`;

export const IconContainer = styled.View`
  margin-right: 6px;
`;