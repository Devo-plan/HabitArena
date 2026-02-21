import { IsNotEmpty, IsString } from 'class-validator';

export class JoinSquadDto {
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}
