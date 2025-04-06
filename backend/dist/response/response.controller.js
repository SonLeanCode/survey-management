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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseController = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("./response.service");
const jwt_auth_guard_1 = require("../modules/auth/guards/jwt-auth.guard");
const get_user_decorator_1 = require("../modules/auth/decorators/get-user.decorator");
const user_entity_1 = require("../modules/user/entities/user.entity");
let ResponseController = class ResponseController {
    responseService;
    constructor(responseService) {
        this.responseService = responseService;
    }
    async create(surveyId, user, answers) {
        return this.responseService.create(surveyId, user.id, answers);
    }
    async findAll(surveyId) {
        return this.responseService.findAll(surveyId);
    }
    async findOne(id) {
        return this.responseService.findOne(id);
    }
    async remove(id) {
        await this.responseService.remove(id);
    }
};
exports.ResponseController = ResponseController;
__decorate([
    (0, common_1.Post)(':surveyId'),
    __param(0, (0, common_1.Param)('surveyId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)('answers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Array]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('survey/:surveyId'),
    __param(0, (0, common_1.Param)('surveyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "remove", null);
exports.ResponseController = ResponseController = __decorate([
    (0, common_1.Controller)('responses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [response_service_1.ResponseService])
], ResponseController);
//# sourceMappingURL=response.controller.js.map