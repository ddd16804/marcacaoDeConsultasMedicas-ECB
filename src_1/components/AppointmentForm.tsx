import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Button, Input, Text } from 'react-native-elements';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import theme from '../styles/theme';
import { User } from '../types/doctors';
import { authApiService } from '../services/authApi';
import { specialtiesApiService, Specialty } from '../services/specialtiesApi';

type AppointmentFormProps = {
  onSubmit: (appointment: {
    doctorId: string;
    date: Date;
    time: string;
    description: string;
  }) => void;
};

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [doctors, setDoctors] = useState<User[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedSpecialty) {
      loadDoctorsBySpecialty(selectedSpecialty);
    } else {
      loadAllDoctors();
    }
  }, [selectedSpecialty]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [specialtiesData, doctorsData] = await Promise.all([
        specialtiesApiService.getAllSpecialties(),
        authApiService.getAllDoctors(),
      ]);
      setSpecialties(specialtiesData);
      setDoctors(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar dados iniciais.');
    } finally {
      setLoading(false);
    }
  };

  const loadDoctorsBySpecialty = async (specialty: string) => {
    try {
      setLoading(true);
      const doctorsData = await authApiService.getDoctorsBySpecialty(specialty);
      setDoctors(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar médicos.');
    } finally {
      setLoading(false);
    }
  };

  const loadAllDoctors = async () => {
    try {
      setLoading(true);
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar médicos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !description) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de continuar.');
      return;
    }

    onSubmit({
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      description,
    });

    setStatusMessage('✅ Consulta agendada com sucesso!');
    setTimeout(() => setStatusMessage(null), 2000);
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <LoadingText>Carregando informações...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Selecione a Especialidade</Title>
      <SpecialtyContainer>
        {specialties.map((specialty) => (
          <SpecialtyButton
            key={specialty.id}
            selected={selectedSpecialty === specialty.name}
            onPress={() => setSelectedSpecialty(specialty.name)}
          >
            <SpecialtyText selected={selectedSpecialty === specialty.name}>
              {specialty.name}
            </SpecialtyText>
          </SpecialtyButton>
        ))}
      </SpecialtyContainer>

      <Title>Selecione o Médico</Title>
      <DoctorList>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            selected={selectedDoctor === doctor.id}
            onPress={() => setSelectedDoctor(doctor.id)}
          >
            <DoctorImage
              source={
                doctor.image
                  ? { uri: doctor.image }
                  : // usa imagem fixa local se não tiver imagem vinda do backend
                    [
                      require('../../../assets/doctor1.png'),
                      require('../../../assets/doctor2.png'),
                      require('../../../assets/doctor3.png'),
                    ][index % 3]
              }
            />
            <DoctorInfo>
              <DoctorName>{doctor.name}</DoctorName>
              <DoctorSpecialty>
                {'specialty' in doctor ? doctor.specialty : 'Especialidade não informada'}
              </DoctorSpecialty>
            </DoctorInfo>
          </DoctorCard>
        ))}
      </DoctorList>

      <Title>Data e Hora</Title>
      <CalendarContainer>
        <CalendarPicker
            onDateChange={(date) => setSelectedDate(date ? new Date(date.toString()) : null)}
            selectedDayColor={theme.colors.primary}
            selectedDayTextColor="#fff"
            todayBackgroundColor={theme.colors.primary}
            textStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.text }}
            width={340}
          />
      </CalendarContainer>

      {selectedDate && (
        <>
          <TimeSlotsContainer>
            <TimeSlotsTitle>Horários Disponíveis:</TimeSlotsTitle>
            <TimeSlotsGrid>
              {timeSlots.map((time) => (
                <TimeSlotButton
                  key={time}
                  selected={selectedTime === time}
                  onPress={() => setSelectedTime(time)}
                >
                  <TimeSlotText selected={selectedTime === time}>{time}</TimeSlotText>
                </TimeSlotButton>
              ))}
            </TimeSlotsGrid>
          </TimeSlotsContainer>

          <Input
            placeholder="Descrição da consulta"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            containerStyle={InputContainer}
          />

          {statusMessage && <StatusText>{statusMessage}</StatusText>}

          <SubmitButton
            title="Agendar Consulta"
            onPress={handleSubmit}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              borderRadius: 8,
              padding: 12,
              marginTop: 20,
            }}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const LoadingText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.medium}px;
`;

const SpecialtyContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
  margin-bottom: ${theme.spacing.medium}px;
`;

const SpecialtyButton = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  background-color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.white};
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.text};
`;

const SpecialtyText = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props) => (props.selected ? theme.colors.white : theme.colors.text)};
`;

const DoctorList = styled.ScrollView`
  margin-bottom: ${theme.spacing.large}px;
`;

const DoctorCard = styled(TouchableOpacity)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${(props) =>
    props.selected ? theme.colors.primaryLight : theme.colors.white};
  border-radius: 8px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const CalendarContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsTitle = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
`;

const TimeSlotButton = styled(TouchableOpacity)<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.white};
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.text};
`;

const TimeSlotText = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props) =>
    props.selected ? theme.colors.white : theme.colors.text};
`;

const InputContainer = {
  marginBottom: theme.spacing.medium,
  backgroundColor: theme.colors.white,
  borderRadius: 8,
  paddingHorizontal: theme.spacing.medium,
};

const StatusText = styled.Text`
  text-align: center;
  color: ${theme.colors.success};
  font-family: 'Poppins-Medium';
  margin-top: ${theme.spacing.small}px;
`;

const SubmitButton = styled(Button)`
  margin-top: ${theme.spacing.large}px;
`;

export default AppointmentForm;
