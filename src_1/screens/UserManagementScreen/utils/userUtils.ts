import theme from '../../styles/theme';
import { User } from '../../types/auth';

export const getRoleText = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'doctor':
      return 'Médico';
    case 'patient':
      return 'Paciente';
    default:
      return role;
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'admin':
      return theme.colors.primary;
    case 'doctor':
      return theme.colors.success;
    case 'patient':
      return theme.colors.secondary;
    default:
      return theme.colors.textSecondary;
  }
};

export const getRoleIcon = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'security';
    case 'doctor':
      return 'local-hospital';
    case 'patient':
      return 'person';
    default:
      return 'help';
  }
};

export const filterCurrentUser = (users: User[], currentUserId?: string): User[] => {
  return users.filter(user => user.id !== currentUserId);
};