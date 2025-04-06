import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { Survey } from '../survey/entities/survey.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(surveyId: string, userId: string, answers: any[]): Promise<Response> {
    if (!Array.isArray(answers)) {
      throw new BadRequestException('Answers must be an array');
    }

    const survey = await this.surveyRepository.findOne({ 
      where: { id: surveyId },
      relations: ['questions']
    });
    
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${surveyId} not found`);
    }

    if (!survey.isActive) {
      throw new BadRequestException('Cannot submit response to inactive survey');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const response = this.responseRepository.create({
      survey,
      user,
      answers,
    });

    return this.responseRepository.save(response);
  }

  async findAll(surveyId: string): Promise<Response[]> {
    const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${surveyId} not found`);
    }

    return this.responseRepository.find({
      where: { surveyId },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Response> {
    const response = await this.responseRepository.findOne({
      where: { id },
      relations: ['user', 'survey'],
    });

    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }

    return response;
  }

  async remove(id: string): Promise<void> {
    const response = await this.findOne(id);
    await this.responseRepository.remove(response);
  }
} 