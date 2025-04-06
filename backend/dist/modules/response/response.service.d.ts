import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { Survey } from '../survey/entities/survey.entity';
import { User } from '../user/entities/user.entity';
export declare class ResponseService {
    private responseRepository;
    private surveyRepository;
    private userRepository;
    constructor(responseRepository: Repository<Response>, surveyRepository: Repository<Survey>, userRepository: Repository<User>);
    create(surveyId: string, userId: string, answers: any[]): Promise<Response>;
    findAll(surveyId: string): Promise<Response[]>;
    findOne(id: string): Promise<Response>;
    remove(id: string): Promise<void>;
}
