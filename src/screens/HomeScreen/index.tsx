import React from 'react';
import { RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';
import { useHomeScreen } from './hooks/useHomeScreen';
import { RootStackParamList } from '../../../types/navigation';
import { Appointment } from '../../../types/appointments';
import theme from '../../../styles/theme';
import { Container, Content, AppointmentList } from './styles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { 
    appointments, 
    refreshing, 
    error,
    onRefresh, 
    getDoctorInfo,
    retry 
  } = useHomeScreen();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard 
      appointment={item} 
      doctor={getDoctorInfo(item.doctorId)}
      onEdit={(appointment) => console.log('Editar:', appointment)}
      onDelete={(appointment) => console.log('Excluir:', appointment)}
    />
  );

  const handleCreateAppointment = () => {
    navigation.navigate('CreateAppointment');
  };

  return (
    <Container>
      <Header title="Minhas Consultas" />
      
      <Content>
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme.spacing.medium
          }}
          onPress={handleCreateAppointment}
        />

        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyState 
              message={error || 'Nenhuma consulta agendada'}
              onRetry={error ? retry : undefined}
              loading={refreshing}
            />
          }
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;