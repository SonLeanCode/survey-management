import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../survey/entities/survey.entity';
import { Response } from '../response/entities/response.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async generateReport(surveyId: string) {
    const survey = await this.surveyRepository.findOne({ 
      where: { id: surveyId },
      relations: ['responses']
    });
    
    if (!survey) {
      throw new Error('Survey not found');
    }

    const responses = await this.responseRepository.find({ 
      where: { surveyId } 
    });

    return {
      survey,
      responses,
      summary: {
        totalResponses: responses.length,
        // Add more summary statistics as needed
      }
    };
  }
} 