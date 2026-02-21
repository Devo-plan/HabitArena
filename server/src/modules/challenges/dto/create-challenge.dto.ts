import {
  IsString,
  IsOptional,
  IsDateString,
  MinLength,
  MaxLength,
  IsObject,
} from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  season?: string;

  @IsOptional()
  @IsObject()
  rules?: Record<string, unknown>;
}
