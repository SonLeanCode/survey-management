"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async handleGoogleLogin(profile) {
        try {
            const existingUser = await this.userService.findByGoogleId(profile.googleId);
            const user = existingUser || await this.userService.create({
                email: profile.email,
                firstName: profile.firstName,
                lastName: profile.lastName,
                name: profile.name,
                picture: profile.picture,
                googleId: profile.googleId,
            });
            const payload = {
                sub: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                picture: user.picture
            };
            const access_token = this.jwtService.sign(payload);
            return {
                access_token,
                user,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.UnauthorizedException(`Failed to process Google login: ${error.message}`);
            }
            throw new common_1.UnauthorizedException('Failed to process Google login');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map