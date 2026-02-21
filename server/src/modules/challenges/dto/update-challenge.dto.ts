import {
  IsString,
  IsOptional,
  IsDateString,
  IsIn,
  MinLength,
  MaxLength,
  IsObject,
} from 'class-validator';

const VALID_STATUSES = ['draft', 'active', 'ended', 'upcoming'] as const;

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  season?: string;

  @IsOptional()
  @IsIn(VALID_STATUSES)
  status?: (typeof VALID_STATUSES)[number];

  @IsOptional()
  @IsObject()
  rules?: Record<string, unknown>;
}
