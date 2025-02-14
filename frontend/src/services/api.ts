import axios from 'axios';
import { User } from '../types/auth';
import { Application, Scholarship } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string, role: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password, name, role });
    return response.data;
  },
};

export const scholarshipService = {
  getAll: async () => {
    const response = await api.get<Scholarship[]>('/scholarships');
    return response.data;
  },
  getById: async (id: string) => {
    if (!id) throw new Error('Scholarship ID is required');
    const response = await api.get<Scholarship>(`/scholarships/${id}`);
    return response.data;
  },
  create: async (data: Partial<Scholarship>) => {
    const response = await api.post<Scholarship>('/scholarships', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Scholarship>) => {
    if (!id) throw new Error('Scholarship ID is required');
    const response = await api.put<Scholarship>(`/scholarships/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    if (!id) throw new Error('Scholarship ID is required');
    const response = await api.delete(`/scholarships/${id}`);
    return response.data;
  },
  apply: async (scholarshipId: string, documents: string[]) => {
    if (!scholarshipId) throw new Error('Scholarship ID is required');
    const response = await api.post(`/scholarships/${scholarshipId}/apply`, { documents });
    return response.data;
  },
};

export const applicationService = {
  getAll: async () => {
    const response = await api.get<Application[]>('/applications');
    return response.data;
  },
  getMyApplications: async () => {
    const response = await api.get<Application[]>('/applications/me');
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    if (!id) throw new Error('Application ID is required');
    const response = await api.patch(`/applications/${id}`, { status });
    return response.data;
  },
};

export const userService = {
  getAll: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  getById: async (id: string) => {
    if (!id) throw new Error('User ID is required');
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  create: async (userData: Partial<User>) => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },
  update: async (id: string, data: Partial<User>) => {
    if (!id) throw new Error('User ID is required');
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },
  updateStatus: async (id: string, status: boolean) => {
    if (!id) throw new Error('User ID is required');
    const response = await api.patch<User>(`/users/${id}/status`, { status });
    return response.data;
  },
  delete: async (id: string) => {
    if (!id) throw new Error('User ID is required');
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export const studentService = {
  getMyStudents: async () => {
    const response = await api.get('/students/me');
    return response.data;
  },
  getStudentDetails: async (id: string) => {
    if (!id) throw new Error('Student ID is required');
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
};