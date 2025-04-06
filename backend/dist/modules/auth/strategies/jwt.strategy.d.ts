import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
interface JwtUserPayload {
    sub: string;
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    picture?: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtUserPayload): Promise<{
        id: string;
        email: string;
        firstName: string | undefined;
        lastName: string | undefined;
        name: string | undefined;
        picture: string | undefined;
    }>;
}
export {};
