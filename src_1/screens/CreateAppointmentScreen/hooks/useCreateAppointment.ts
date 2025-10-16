import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { authApiService } from '../../../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Doctor, Appointment } from '../../../types/appointments';

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setError('Erro ao carregar médicos. Tente novamente.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return false;
      }

      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      appointments.push(newAppointment);
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      return true;
    } catch (err) {
      setError('Erro ao agendar consulta. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
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
    handleCreateAppointment,
  };
};