import { Survey } from '../entities/survey.entity';
export interface SurveyWithResponseCount extends Omit<Survey, 'responses'> {
    responses: number;
}
