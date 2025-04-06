import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { User } from '../user/entities/user.entity';
import { ISurvey } from '../../common/interfaces/survey.interface';

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

  async findAll(user: User, filters: any): Promise<Survey[]> {
    const { search, isActive, sortBy, sortOrder } = filters;
    
    const whereClause: Record<string, any> = { userId: user.id };
    
    if (search) {
      whereClause.title = Like(`%${search}%`);
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }
    
    const order: Record<string, any> = {};
    if (sortBy) {
      order[sortBy] = sortOrder || 'ASC';
    } else {
      order.createdAt = 'DESC';
    }
    
    return this.surveyRepository.find({
      where: whereClause,
      order,
    });
  }

  async findOne(id: string, user: User): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ where: { id } });
    
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    
    if (survey.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this survey');
    }
    
    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto, user: User): Promise<Survey> {
    const survey = await this.findOne(id, user);
    
    // Update the survey entity
    Object.assign(survey, {
      title: updateSurveyDto.title,
      description: updateSurveyDto.description,
      isActive: updateSurveyDto.isActive,
      questions: Array.isArray(updateSurveyDto.questions) ? updateSurveyDto.questions : survey.questions
    });
    
    return this.surveyRepository.save(survey);
  }

  async remove(id: string, user: User): Promise<void> {
    const survey = await this.findOne(id, user);
    await this.surveyRepository.remove(survey);
  }
} 