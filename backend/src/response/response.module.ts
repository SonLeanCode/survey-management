import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { Response } from '../modules/response/entities/response.entity';
import { Survey } from '../modules/survey/entities/survey.entity';
import { User } from '../modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response, Survey, User]),
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {} 