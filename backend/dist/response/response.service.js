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
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const response_entity_1 = require("./entities/response.entity");
const survey_entity_1 = require("../survey/entities/survey.entity");
const user_entity_1 = require("../user/entities/user.entity");
let ResponseService = class ResponseService {
    responseRepository;
    surveyRepository;
    userRepository;
    constructor(responseRepository, surveyRepository, userRepository) {
        this.responseRepository = responseRepository;
        this.surveyRepository = surveyRepository;
        this.userRepository = userRepository;
    }
    async create(surveyId, userId, answers) {
        if (!Array.isArray(answers)) {
            throw new common_1.BadRequestException('Answers must be an array');
        }
        const survey = await this.surveyRepository.findOne({
            where: { id: surveyId },
            relations: ['questions']
        });
        if (!survey) {
            throw new common_1.NotFoundException(`Survey with ID ${surveyId} not found`);
        }
        if (!survey.isActive) {
            throw new common_1.BadRequestException('Cannot submit response to inactive survey');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const response = this.responseRepository.create({
            survey,
            user,
            answers,
        });
        return this.responseRepository.save(response);
    }
    async findAll(surveyId) {
        const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
        if (!survey) {
            throw new common_1.NotFoundException(`Survey with ID ${surveyId} not found`);
        }
        return this.responseRepository.find({
            where: { surveyId },
            relations: ['user'],
            order: { createdAt: 'DESC' }
        });
    }
    async findOne(id) {
        const response = await this.responseRepository.findOne({
            where: { id },
            relations: ['user', 'survey'],
        });
        if (!response) {
            throw new common_1.NotFoundException(`Response with ID ${id} not found`);
        }
        return response;
    }
    async remove(id) {
        const response = await this.findOne(id);
        await this.responseRepository.remove(response);
    }
};
exports.ResponseService = ResponseService;
exports.ResponseService = ResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(response_entity_1.Response)),
    __param(1, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ResponseService);
//# sourceMappingURL=response.service.js.map