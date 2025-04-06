import { Survey } from '../../survey/entities/survey.entity';
import { User } from '../../user/entities/user.entity';
export declare class Response {
    id: string;
    answers: any[];
    survey: Survey;
    surveyId: string;
    user: User;
    userId: string;
    createdAt: Date;
}
