import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import { useAdminDashboard } from './hooks/useAdminDashboard';
import { TabNavigation } from './components/TabNavigation';
import { StatsCard } from './components/StatsCard';
import { AppointmentCard } from './components/AppointmentCard';
import { EmptyState } from './components/EmptyState';
import Header from '../HomeScreen/components/Header';
import theme from '../../styles/theme';
import { 
  Container, 
  Title, 
  SectionTitle, 
  LoadingText 
} from './styles';

const AdminDashboardScreen: React.FC = () => {
  const {
    appointments,
    users,
    loading,
    activeTab,
    appointmentStats,
    setActiveTab,
    handleUpdateStatus,
    signOut
  } = useAdminDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Painel Administrativo</Title>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'appointments' ? (
          <>
            <StatsCard 
              icon="calendar-today" 
              number={appointmentStats.total} 
              label="Total de Consultas"
              backgroundColor={theme.colors.primary}
              iconColor="#fff"
            />

            <SectionTitle>Últimas Consultas</SectionTitle>
            
            {loading ? (
              <LoadingText>Carregando dados...</LoadingText>
            ) : appointments.length === 0 ? (
              <EmptyState 
                icon="calendar-remove"
                message="Nenhuma consulta agendada"
              />
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                  onStatusUpdate={handleUpdateStatus}
                />
              ))
            )}
          </>
        ) : (
          <UserManagement />
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={{ marginBottom: 20, width: '100%' }}
          buttonStyle={{ 
            backgroundColor: theme.colors.error,
            paddingVertical: 12 
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default AdminDashboardScreen;