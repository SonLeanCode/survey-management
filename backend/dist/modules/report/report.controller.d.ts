import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    generateReport(surveyId: string): Promise<{
        survey: import("../survey/entities/survey.entity").Survey;
        responses: import("../response/entities/response.entity").Response[];
        summary: {
            totalResponses: number;
        };
    }>;
}
