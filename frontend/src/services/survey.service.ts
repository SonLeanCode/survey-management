import api from './api';

export interface Survey {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  questions: Question[];
  responses: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  required: boolean;
  options?: string[];
}

export interface CreateSurveyDto {
  title: string;
  description: string;
  isActive: boolean;
  questions: Question[];
}

export interface UpdateSurveyDto {
  title?: string;
  description?: string;
  isActive?: boolean;
  questions?: Question[];
}

export const surveyService = {
  async getAll(params?: {
    search?: string;
    isActive?: boolean;
    sortBy?: 'createdAt' | 'title';
    sortOrder?: 'ASC' | 'DESC';
  }) {
    const response = await api.get<Survey[]>('/surveys', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Survey>(`/surveys/${id}`);
    return response.data;
  },

  async create(data: CreateSurveyDto) {
    const response = await api.post<Survey>('/surveys', data);
    return response.data;
  },

  async update(id: string, data: UpdateSurveyDto) {
    const response = await api.patch<Survey>(`/surveys/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/surveys/${id}`);
  },
}; 