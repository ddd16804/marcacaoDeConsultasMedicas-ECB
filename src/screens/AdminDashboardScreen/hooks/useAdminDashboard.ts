import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../../contexts/AuthContext';
import { Appointment, User } from '../../../types/navigation';
import { AppointmentStatus } from '../utils/statusHelpers';

export const useAdminDashboard = () => {
  const { signOut } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'users'>('appointments');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleUpdateStatus = useCallback(async (appointmentId: string, newStatus: AppointmentStatus) => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        
        await AsyncStorage.setItem(
          '@MedicalApp:appointments', 
          JSON.stringify(updatedAppointments)
        );
        loadData();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  }, [loadData]);

  const appointmentStats = useMemo(() => ({
    total: appointments.length,
    pending: appointments.filter(app => app.status === 'pending').length,
    confirmed: appointments.filter(app => app.status === 'confirmed').length,
    cancelled: appointments.filter(app => app.status === 'cancelled').length,
  }), [appointments]);

  const userStats = useMemo(() => ({
    total: users.length,
    admins: users.filter(user => user.role === 'admin').length,
    doctors: users.filter(user => user.role === 'doctor').length,
    patients: users.filter(user => user.role === 'patient').length,
  }), [users]);

  return {
    appointments,
    users,
    loading,
    activeTab,
    appointmentStats,
    userStats,
    setActiveTab,
    handleUpdateStatus,
    refreshData: loadData,
    signOut
  };
};