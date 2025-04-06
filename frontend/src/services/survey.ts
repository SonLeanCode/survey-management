import api from './api';

// Kiểu dữ liệu cơ bản
export interface Survey {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  questions: Question[];
}

export interface Question {
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  required: boolean;
  options?: string[];
}

// Các hàm gọi API
export const surveyApi = {
  // Lấy danh sách survey
  getAll: async () => {
    const response = await api.get('/surveys');
    return response.data;
  },

  // Lấy chi tiết survey
  getById: async (id: string) => {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  },

  // Tạo survey mới
  create: async (data: { title: string; description: string }) => {
    const response = await api.post('/surveys', data);
    return response.data;
  },

  // Cập nhật survey
  update: async (id: string, data: { title?: string; description?: string }) => {
    const response = await api.patch(`/surveys/${id}`, data);
    return response.data;
  },

  // Xóa survey
  delete: async (id: string) => {
    await api.delete(`/surveys/${id}`);
  }
}; 