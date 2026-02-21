import { IsInt, Min, Max } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @Min(0, { message: 'Progress must be at least 0' })
  @Max(100, { message: 'Progress must be at most 100' })
  progress: number;
}
