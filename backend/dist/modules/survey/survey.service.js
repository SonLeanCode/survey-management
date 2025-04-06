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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("./entities/survey.entity");
let SurveyService = class SurveyService {
    surveyRepository;
    constructor(surveyRepository) {
        this.surveyRepository = surveyRepository;
    }
    async create(createSurveyDto, user) {
        const survey = this.surveyRepository.create({
            ...createSurveyDto,
            userId: user.id,
            questions: createSurveyDto.questions || [],
        });
        return this.surveyRepository.save(survey);
    }
    async findAll(user, filters) {
        const { search, isActive, sortBy, sortOrder } = filters;
        const whereClause = { userId: user.id };
        if (search) {
            whereClause.title = (0, typeorm_2.Like)(`%${search}%`);
        }
        if (isActive !== undefined) {
            whereClause.isActive = isActive;
        }
        const order = {};
        if (sortBy) {
            order[sortBy] = sortOrder || 'ASC';
        }
        else {
            order.createdAt = 'DESC';
        }
        return this.surveyRepository.find({
            where: whereClause,
            order,
        });
    }
    async findOne(id, user) {
        const survey = await this.surveyRepository.findOne({ where: { id } });
        if (!survey) {
            throw new common_1.NotFoundException(`Survey with ID ${id} not found`);
        }
        if (survey.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to access this survey');
        }
        return survey;
    }
    async update(id, updateSurveyDto, user) {
        const survey = await this.findOne(id, user);
        Object.assign(survey, {
            title: updateSurveyDto.title,
            description: updateSurveyDto.description,
            isActive: updateSurveyDto.isActive,
            questions: Array.isArray(updateSurveyDto.questions) ? updateSurveyDto.questions : survey.questions
        });
        return this.surveyRepository.save(survey);
    }
    async remove(id, user) {
        const survey = await this.findOne(id, user);
        await this.surveyRepository.remove(survey);
    }
};
exports.SurveyService = SurveyService;
exports.SurveyService = SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SurveyService);
//# sourceMappingURL=survey.service.js.map