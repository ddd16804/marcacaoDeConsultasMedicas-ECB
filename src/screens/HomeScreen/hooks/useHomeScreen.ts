import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { authApiService } from '../../../../services/authApi';
import { useAppointments } from '../../../../hooks/useAppointments';
import { User } from '../../../../types/auth';

export const useHomeScreen = () => {
  const { appointments, loading: loadingAppointments, error: appointmentsError, loadAppointments } = useAppointments();
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorsError, setDoctorsError] = useState<string | null>(null);

  const loadDoctors = useCallback(async () => {
    setLoadingDoctors(true);
    setDoctorsError(null);
    try {
      const doctorsData = await authApiService.getAllDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setDoctorsError('Falha ao carregar dados dos médicos');
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  const getDoctorInfo = useCallback((doctorId: string): User | undefined => {
    return doctors.find(doctor => doctor.id === doctorId);
  }, [doctors]);

  const onRefresh = useCallback(async () => {
    await Promise.all([loadAppointments(), loadDoctors()]);
  }, [loadAppointments, loadDoctors]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
      loadDoctors();
    }, [loadAppointments, loadDoctors])
  );

  return { 
    appointments, 
    doctors, 
    refreshing: loadingAppointments || loadingDoctors,
    error: appointmentsError || doctorsError,
    onRefresh, 
    getDoctorInfo,
    retry: onRefresh
  };
};