import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth.interface';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: AuthRequest, res: Response): Promise<void>;
    getProfile(req: AuthRequest): import("../user/entities/user.entity").User;
}
