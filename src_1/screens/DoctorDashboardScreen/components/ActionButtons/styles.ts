import { ViewStyle } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = {
  actionButton: {
    marginTop: 8,
    width: '48%',
  } as ViewStyle,
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
};

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;
`;

export const ActionButtonContainer = styled.TouchableOpacity<{ variant: 'confirm' | 'cancel' }>`
  flex: 1;
  background-color: ${props => 
    props.variant === 'confirm' ? theme.colors.success : theme.colors.error};
  padding: 12px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonText = styled.Text`
  color: ${theme.colors.white};
  font-weight: 600;
  font-size: 14px;
`;