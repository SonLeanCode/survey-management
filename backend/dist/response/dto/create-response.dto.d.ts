declare class AnswerDto {
    questionId: string;
    answer: string | string[];
}
export declare class CreateResponseDto {
    surveyId: string;
    answers: AnswerDto[];
}
export {};
