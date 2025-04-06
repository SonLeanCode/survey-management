import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByGoogleId(googleId: string): Promise<User | null>;
    create(userData: {
        email: string;
        firstName: string;
        lastName: string;
        name: string;
        picture: string;
        googleId: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
