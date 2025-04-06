import { Repository } from 'typeorm';
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
export declare class SurveyService {
    private surveyRepository;
    constructor(surveyRepository: Repository<Survey>);
    create(createSurveyDto: CreateSurveyDto, user: User): Promise<Survey>;
    findAll(user: User, filters?: SurveyFilters): Promise<Survey[]>;
    findOne(id: string, user: User): Promise<Survey>;
    update(id: string, updateSurveyDto: UpdateSurveyDto, user: User): Promise<Survey>;
    remove(id: string, user: User): Promise<void>;
}
export {};
