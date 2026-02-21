import { IsString, IsOptional, IsArray, MaxLength, MinLength } from 'class-validator';

export class CreateRitualRoomDto {
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  habits?: string[];
}
