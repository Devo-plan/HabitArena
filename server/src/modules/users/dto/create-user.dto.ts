export class CreateUserDto {
  email: string;
  passwordHash: string;
  displayName: string;
  refreshTokenHash?: string;
}
