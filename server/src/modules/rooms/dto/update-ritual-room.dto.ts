import { IsString, IsOptional, IsArray, MaxLength, MinLength } from 'class-validator';

export class UpdateRitualRoomDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  habits?: string[];
}
