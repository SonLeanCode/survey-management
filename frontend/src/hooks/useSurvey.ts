import { useState, useCallback } from 'react';
import { surveyService, Survey, CreateSurveyDto, UpdateSurveyDto } from '../services/survey.service';
import { toast } from 'react-hot-toast';

export const useSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: any) => {
    const message = error.response?.data?.message || 'An error occurred';
    setError(message);
    toast.error(message);
  };

  const getAll = useCallback(async (params?: {
    search?: string;
    isActive?: boolean;
    sortBy?: 'createdAt' | 'title';
    sortOrder?: 'ASC' | 'DESC';
  }) => {
    try {
      setLoading(true);
      setError(null);
      return await surveyService.getAll(params);
    } catch (error) {
      handleError(error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      return await surveyService.getById(id);
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data: CreateSurveyDto) => {
    try {
      setLoading(true);
      setError(null);
      const survey = await surveyService.create(data);
      toast.success('Survey created successfully');
      return survey;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, data: UpdateSurveyDto) => {
    try {
      setLoading(true);
      setError(null);
      const survey = await surveyService.update(id, data);
      toast.success('Survey updated successfully');
      return survey;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await surveyService.delete(id);
      toast.success('Survey deleted successfully');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}; 