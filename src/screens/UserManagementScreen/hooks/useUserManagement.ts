import { useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/auth';
import { Alert } from 'react-native';

export const useUserManagement = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'UserManagement'>>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        const filteredUsers = allUsers.filter(u => u.id !== user?.id);
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleDeleteUser = async (userId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
              if (storedUsers) {
                const allUsers: User[] = JSON.parse(storedUsers);
                const updatedUsers = allUsers.filter(u => u.id !== userId);
                await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
                loadUsers();
              }
            } catch (error) {
              console.error('Erro ao deletar usuário:', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          }
        }
      ]
    );
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleAddUser = () => {
    // TODO: Implementar navegação para tela de adicionar usuário
    console.log('Navegar para tela de adicionar usuário');
  };

  const handleEditUser = (userId: string) => {
    // TODO: Implementar navegação para tela de editar usuário
    console.log('Editar usuário:', userId);
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  return {
    users,
    loading,
    handleDeleteUser,
    navigateBack,
    handleAddUser,
    handleEditUser
  };
};