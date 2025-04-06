import { User } from '../../user/entities/user.entity';
export interface JwtUserPayload {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;
}
export interface AuthResponse {
    user: User;
    token: string;
}
