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
const create_user_dto_1 = require("../user/dto/create-user.dto");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(userPayload) {
        const token = await Promise.resolve(this.jwtService.sign({
            sub: userPayload.sub,
            email: userPayload.email,
            firstName: userPayload.firstName,
            lastName: userPayload.lastName,
            name: userPayload.name,
            picture: userPayload.picture
        }));
        return {
            access_token: token,
            user: userPayload,
        };
    }
    async handleGoogleLogin(profile) {
        let user = await this.userService.findByGoogleId(profile.googleId);
        if (!user) {
            const createUserDto = new create_user_dto_1.CreateUserDto();
            createUserDto.email = profile.email;
            createUserDto.firstName = profile.firstName;
            createUserDto.lastName = profile.lastName;
            createUserDto.name = profile.name;
            createUserDto.picture = profile.picture;
            createUserDto.googleId = profile.googleId;
            user = await this.userService.create(createUserDto);
        }
        const payload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            picture: user.picture
        };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
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