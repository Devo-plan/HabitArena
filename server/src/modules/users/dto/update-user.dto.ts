import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Display name must be at least 2 characters' })
  @MaxLength(50, { message: 'Display name must be at most 50 characters' })
  displayName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
