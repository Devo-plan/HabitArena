import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
}
