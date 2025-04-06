import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  questions?: any[] = [];
} 