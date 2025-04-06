import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ResponseService } from './response.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('responses')
@UseGuards(JwtAuthGuard)
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post(':surveyId')
  async create(
    @Param('surveyId') surveyId: string,
    @GetUser() user: User,
    @Body('answers') answers: any[],
  ) {
    return this.responseService.create(surveyId, user.id, answers);
  }

  @Get('survey/:surveyId')
  async findAll(@Param('surveyId') surveyId: string) {
    return this.responseService.findAll(surveyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.responseService.remove(id);
  }
} 