import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtUserPayload } from './interfaces/auth.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getProfile(req: Request & {
        user: JwtUserPayload;
    }): {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
