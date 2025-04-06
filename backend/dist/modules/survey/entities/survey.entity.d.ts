import { User } from '../../user/entities/user.entity';
import { Response } from '../../response/entities/response.entity';
export declare class Survey {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    questions: any[];
    user: User;
    userId: string;
    responses: Response[];
    createdAt: Date;
    updatedAt: Date;
}
