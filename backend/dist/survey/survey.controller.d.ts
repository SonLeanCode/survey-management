import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AuthRequest } from '../auth/interfaces/auth.interface';
type SortByType = 'createdAt' | 'title';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    create(createSurveyDto: CreateSurveyDto, req: AuthRequest): Promise<import("./entities/survey.entity").Survey>;
    getNewSurveyForm(): {
        message: string;
    };
    findAll(req: AuthRequest, search?: string, isActive?: string, sortBy?: SortByType, sortOrder?: 'ASC' | 'DESC'): Promise<import("./entities/survey.entity").Survey[]>;
    findOne(id: string, req: AuthRequest): Promise<import("./entities/survey.entity").Survey>;
    update(id: string, updateSurveyDto: UpdateSurveyDto, req: AuthRequest): Promise<import("./entities/survey.entity").Survey>;
    remove(id: string, req: AuthRequest): Promise<void>;
}
export {};
