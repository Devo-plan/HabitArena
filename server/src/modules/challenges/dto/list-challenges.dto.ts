import { IsOptional, IsInt, Min, Max, IsIn, IsString } from 'class-validator';
import { Type } from 'class-transformer';

const VALID_STATUSES = ['draft', 'active', 'ended', 'upcoming'] as const;

export class ListChallengesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsIn(VALID_STATUSES)
  status?: (typeof VALID_STATUSES)[number];

  @IsOptional()
  @IsString()
  season?: string;

  @IsOptional()
  @IsString()
  search?: string; // search by name
}
