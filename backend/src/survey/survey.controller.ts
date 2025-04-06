import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../auth/interfaces/auth.interface';
import { User } from '../user/entities/user.entity';

type SortByType = 'createdAt' | 'title';

@Controller('surveys')
@UseGuards(JwtAuthGuard)
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto, @Request() req: AuthRequest) {
    const user = req.user as User;
    return this.surveyService.create(createSurveyDto, user);
  }

  @Get('new')
  getNewSurveyForm() {
    return { message: 'New survey form' };
  }

  @Get()
  findAll(
    @Request() req: AuthRequest,
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
    @Query('sortBy') sortBy?: SortByType,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    const user = req.user as User;
    const filters = {
      search,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      sortBy,
      sortOrder,
    };
    return this.surveyService.findAll(user, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    const user = req.user as User;
    return this.surveyService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
    @Request() req: AuthRequest,
  ) {
    const user = req.user as User;
    return this.surveyService.update(id, updateSurveyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthRequest) {
    const user = req.user as User;
    return this.surveyService.remove(id, user);
  }
} 