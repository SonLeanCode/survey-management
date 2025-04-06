import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { User } from '../user/entities/user.entity';

interface SurveyFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'title';
  sortOrder?: 'ASC' | 'DESC';
}

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto, user: User): Promise<Survey> {
    const survey = this.surveyRepository.create({
      ...createSurveyDto,
      userId: user.id,
      questions: createSurveyDto.questions || [],
    });
    return this.surveyRepository.save(survey);
  }

  async findAll(user: User, filters: SurveyFilters = {}): Promise<Survey[]> {
    const { search, isActive, sortBy = 'createdAt', sortOrder = 'DESC' } = filters;
    
    const whereClause: Record<string, unknown> = { userId: user.id };
    
    if (search) {
      whereClause.title = Like(`%${search}%`);
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }
    
    const order: Record<string, 'ASC' | 'DESC'> = {
      [sortBy]: sortOrder
    };
    
    return this.surveyRepository.find({
      where: whereClause,
      order,
      relations: ['user'],
    });
  }

  async findOne(id: string, user: User): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({
      where: { id, userId: user.id },
      relations: ['user', 'responses'],
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto, user: User): Promise<Survey> {
    const survey = await this.findOne(id, user);
    

    if (updateSurveyDto.questions !== undefined) {
      survey.questions = updateSurveyDto.questions;
    }
    
   
    if (updateSurveyDto.title !== undefined) {
      survey.title = updateSurveyDto.title;
    }
    if (updateSurveyDto.description !== undefined) {
      survey.description = updateSurveyDto.description;
    }
    if (updateSurveyDto.isActive !== undefined) {
      survey.isActive = updateSurveyDto.isActive;
    }
    
    return this.surveyRepository.save(survey);
  }

  async remove(id: string, user: User): Promise<void> {
    const survey = await this.findOne(id, user);
    await this.surveyRepository.remove(survey);
  }
} 