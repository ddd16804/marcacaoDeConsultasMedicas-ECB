import React from 'react';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types/navigation';
import { Title, ErrorText } from '../../styles';
import { styles, FormContainer, ButtonContainer } from './styles';

type AppointmentFormProps = {
  date: string;
  setDate: (date: string) => void;
  loading: boolean;
  error: string;
  onSubmit: () => Promise<boolean>;
  children: React.ReactNode;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  date,
  setDate,
  loading,
  error,
  onSubmit,
  children
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    const success = await onSubmit();
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <FormContainer>
      <Title>Agendar Consulta</Title>

      <Input
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
        containerStyle={styles.input}
        keyboardType="numeric"
      />

      {children}

      {error ? <ErrorText>{error}</ErrorText> : null}

      <ButtonContainer>
        <Button
          title="Agendar"
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
          buttonStyle={styles.cancelButton}
        />
      </ButtonContainer>
    </FormContainer>
  );
};

export default AppointmentForm;