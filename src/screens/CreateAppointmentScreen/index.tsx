import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../../components/Header';
import { useCreateAppointment } from './hooks/useCreateAppointment';
import AppointmentForm from './components/AppointmentForm';
import DoctorSelection from './components/DoctorSelection';
import TimeSelection from './components/TimeSelection';
import { Container } from './styles';

const CreateAppointmentScreen: React.FC = () => {
  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    loading,
    error,
    doctors,
    loadingDoctors,
    handleCreateAppointment
  } = useCreateAppointment();

  return (
    <Container>
      <Header />
      <ScrollView>
        <AppointmentForm
          date={date}
          setDate={setDate}
          loading={loading}
          error={error}
          onSubmit={handleCreateAppointment}
        >
          <TimeSelection
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
          
          <DoctorSelection
            doctors={doctors}
            loadingDoctors={loadingDoctors}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
          />
        </AppointmentForm>
      </ScrollView>
    </Container>
  );
};

export default CreateAppointmentScreen;