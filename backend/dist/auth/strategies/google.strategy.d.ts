import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
interface GoogleOAuthProfile {
    id: string;
    displayName: string;
    name: {
        givenName: string;
        familyName: string;
    };
    emails: Array<{
        value: string;
    }>;
    photos: Array<{
        value: string;
    }>;
}
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(request: any, accessToken: string, refreshToken: string, profile: GoogleOAuthProfile, done: VerifyCallback): Promise<void>;
}
export {};
