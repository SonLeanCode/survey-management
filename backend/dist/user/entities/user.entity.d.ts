import { Survey } from '../../survey/entities/survey.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    name: string;
    picture: string;
    googleId: string;
    isActive: boolean;
    surveys: Survey[];
    createdAt: Date;
    updatedAt: Date;
}
