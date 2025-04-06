import { IUser } from './user.interface';

export interface IQuestion {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  required: boolean;
  options?: string[];
  survey: ISurvey;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISurvey {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  user: IUser;
  questions: IQuestion[];
  responses: any[];
  createdAt: Date;
  updatedAt: Date;
} 