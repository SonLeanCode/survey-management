import { ResponseService } from './response.service';
import { User } from '../user/entities/user.entity';
export declare class ResponseController {
    private readonly responseService;
    constructor(responseService: ResponseService);
    create(surveyId: string, user: User, answers: any[]): Promise<import("./entities/response.entity").Response>;
    findAll(surveyId: string): Promise<import("./entities/response.entity").Response[]>;
    findOne(id: string): Promise<import("./entities/response.entity").Response>;
    remove(id: string): Promise<void>;
}
