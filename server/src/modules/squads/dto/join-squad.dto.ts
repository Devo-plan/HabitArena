import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';

export class JoinSquadDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @IsAlphanumeric()
  inviteCode: string;
}
