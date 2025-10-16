import { ViewStyle } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = {
  input: {
    marginBottom: 15,
  } as ViewStyle,
  button: {
    marginTop: 10,
    width: '100%',
  } as ViewStyle,
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

export const FormContainer = styled.View`
  padding: 20px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
  gap: 10px;
`;