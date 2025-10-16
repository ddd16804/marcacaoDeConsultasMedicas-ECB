import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../../components/Header';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import AppointmentList from './components/AppointmentList';
import { Container, Title } from './styles';

const DoctorDashboardScreen: React.FC = () => {
  const {
    appointments,
    loading,
    handleUpdateStatus,
    navigateToProfile,
    handleSignOut
  } = useDoctorDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>

        <Button
          title="Meu Perfil"
          onPress={navigateToProfile}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        <AppointmentList
          appointments={appointments}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />

        <Button
          title="Sair"
          onPress={handleSignOut}
          containerStyle={styles.button}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
};

export default DoctorDashboardScreen;