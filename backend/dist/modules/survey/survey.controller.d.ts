import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { User } from '../user/entities/user.entity';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    create(createSurveyDto: CreateSurveyDto, user: User): Promise<import("./entities/survey.entity").Survey>;
    findAll(user: User, search?: string, isActive?: string, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<import("./entities/survey.entity").Survey[]>;
    findOne(id: string, user: User): Promise<import("./entities/survey.entity").Survey>;
    update(id: string, updateSurveyDto: UpdateSurveyDto, user: User): Promise<import("./entities/survey.entity").Survey>;
    remove(id: string, user: User): Promise<void>;
}
