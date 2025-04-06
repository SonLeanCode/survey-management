import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { GoogleProfile } from './interfaces/auth.interface';
import { User } from '../user/entities/user.entity';
interface AuthResponse {
    access_token: string;
    user: User;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    handleGoogleLogin(profile: GoogleProfile): Promise<AuthResponse>;
}
export {};
