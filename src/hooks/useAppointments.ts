import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types/appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const storedAppointments = await AsyncStorage.getItem('appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      setError('Falha ao carregar consultas');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    loadAppointments
  };
};