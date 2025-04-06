import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { GoogleProfile } from '../../auth/interfaces/auth.interface';
import { JwtUserPayload } from '../../auth/interfaces/auth.interface';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    login(userPayload: JwtUserPayload): Promise<{
        access_token: string;
        user: JwtUserPayload;
    }>;
    handleGoogleLogin(profile: GoogleProfile): Promise<{
        access_token: string;
        user: import("../user/entities/user.entity").User;
    }>;
}
