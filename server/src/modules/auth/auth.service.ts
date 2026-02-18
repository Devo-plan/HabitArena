import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const newUser = await this.usersService.create({
      email: registerDto.email,
      passwordHash,
      displayName: registerDto.displayName,
    });

    const tokens = await this.getTokens(newUser._id.toString(), newUser.email);
    await this.updateRefreshToken(newUser._id.toString(), tokens.refresh_token);

    return tokens;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!passwordMatches) throw new BadRequestException('Invalid credentials');

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    // We update RT hash to null in DB
    await this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshTokenHash) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.refreshTokenHash);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

    return tokens;
  }

  async updateRefreshToken(userId: string, rt: string | null) {
    if (rt) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(rt, salt);
      await this.usersService.updateRefreshToken(userId, hash);
    } else {
      await this.usersService.updateRefreshToken(userId, null);
    }
  }

  async getTokens(userId: string, email: string) {
    const secret = this.configService.get<string>('JWT_SECRET');
    console.log(
      '🔹 AuthService Generating Tokens. Secret:',
      secret ? secret.substring(0, 5) + '...' : 'UNDEFINED'
    );
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY') || '15m',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY') || '7d',
        }
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
