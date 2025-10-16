import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
  REGISTERED_USERS: '@MedicalApp:registeredUsers',
};

// DADOS MOCKADOS - MANTIDOS APENAS PARA COMPATIBILIDADE COM COMPONENTES ANTIGOS
// TODO: Remover quando todos os componentes estiverem usando authApiService

// Médicos mockados (DEPRECATED - usar authApiService.getAllDoctors())
const mockDoctors = [
  // Dados removidos - agora vêm da API
];

// Admin mockado (DEPRECATED - usar authApiService)
const mockAdmin = {
  id: 'admin',
  name: 'Administrador',
  email: 'admin@example.com',
  role: 'admin' as const,
  image: 'https://randomuser.me/api/portraits/men/3.jpg',
};

// Lista de usuários cadastrados (pacientes)
let registeredUsers: (User & { password: string })[] = [];

// Interface para usuário da API
interface ApiUser {
  id: string;
  nome: string;
  email: string;
  tipo: 'MEDICO' | 'PACIENTE' | 'ADMIN';
  especialidade?: string;
  imagem?: string;
  telefone?: string;
  crm?: string;
}

// Configuração da API
const API_BASE_URL = 'https://sua-api.com/api';
const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DOCTORS: '/medicos',
  DOCTORS_BY_SPECIALTY: '/medicos/especialidade',
  USERS: '/usuarios',
};

// Cliente HTTP básico
const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

export const authApiService = {
  // BUSCAR todos os médicos
  async getAllDoctors(): Promise<User[]> {
    try {
      const doctors = await apiClient.get<ApiUser[]>(API_ENDPOINTS.DOCTORS);
      return doctors.map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      throw new Error('Erro ao carregar médicos');
    }
  },

  // BUSCAR médicos por especialidade
  async getDoctorsBySpecialty(specialty: string): Promise<User[]> {
    try {
      const doctors = await apiClient.get<ApiUser[]>(
        `${API_ENDPOINTS.DOCTORS_BY_SPECIALTY}/${encodeURIComponent(specialty)}`
      );
      return doctors.map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar médicos por especialidade:', error);
      throw new Error('Erro ao carregar médicos da especialidade');
    }
  },

  // MAPEAMENTO da API para frontend
  mapApiUserToUser(apiUser: ApiUser): User {
    // NOVO - Ícone de avatar para admins - SVG simples de usuário
    let image: string;
    if (apiUser.tipo === 'ADMIN') {
      image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNjY2NjY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTAgNjVDMzUgNjUgMjUgNzUgMjUgODVWOTVINzVWODVDNzUgNzUgNjUgNjUgNTAgNjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
    } else {
      // Fotos aleatórias para médicos e pacientes
      image = `https://randomuser.me/api/portraits/${apiUser.id % 2 === 0 ? 'men' : 'women'}/${(apiUser.id % 10) + 1}.jpg`;
    }

    const baseUser = {
      id: apiUser.id,
      name: apiUser.nome,
      email: apiUser.email,
      image: apiUser.imagem || image,
    };

    switch (apiUser.tipo) {
      case 'MEDICO':
        return {
          ...baseUser,
          role: 'doctor' as const,
          specialty: apiUser.especialidade || 'Especialidade não informada',
        };
      case 'PACIENTE':
        return {
          ...baseUser,
          role: 'patient' as const,
        };
      case 'ADMIN':
        return {
          ...baseUser,
          role: 'admin' as const,
        };
      default:
        return {
          ...baseUser,
          role: 'patient' as const,
        };
    }
  },

  // Métodos de autenticação existentes
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{ user: ApiUser; token: string }>(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      
      const user = this.mapApiUserToUser(response.user);
      
      // Salva no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      return {
        user,
        token: response.token,
      };
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Email ou senha inválidos');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{ user: ApiUser; token: string }>(
        API_ENDPOINTS.REGISTER,
        data
      );
      
      const user = this.mapApiUserToUser(response.user);
      
      // Salva no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      return {
        user,
        token: response.token,
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      throw new Error('Erro ao criar conta');
    }
  },

  async signOut(): Promise<void> {
    // Limpa os dados do usuário do AsyncStorage
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },

  // Funções para o admin
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await apiClient.get<ApiUser[]>(API_ENDPOINTS.USERS);
      return users.map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao carregar usuários');
    }
  },

  async getPatients(): Promise<User[]> {
    try {
      const users = await apiClient.get<ApiUser[]>(API_ENDPOINTS.USERS);
      return users
        .filter(user => user.tipo === 'PACIENTE')
        .map(this.mapApiUserToUser);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      throw new Error('Erro ao carregar pacientes');
    }
  },

  // Função para carregar usuários registrados ao iniciar o app
  async loadRegisteredUsers(): Promise<void> {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (usersJson) {
        registeredUsers = JSON.parse(usersJson);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  },
};

// Serviço legado mantido para compatibilidade
export const authService = authApiService;