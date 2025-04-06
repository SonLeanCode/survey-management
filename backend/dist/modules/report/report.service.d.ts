import { Repository } from 'typeorm';
import { Survey } from '../survey/entities/survey.entity';
import { Response } from '../response/entities/response.entity';
export declare class ReportService {
    private surveyRepository;
    private responseRepository;
    constructor(surveyRepository: Repository<Survey>, responseRepository: Repository<Response>);
    generateReport(surveyId: string): Promise<{
        survey: Survey;
        responses: Response[];
        summary: {
            totalResponses: number;
        };
    }>;
}
