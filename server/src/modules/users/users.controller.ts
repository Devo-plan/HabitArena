import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest) {
    // req.user is populated by JwtStrategy
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Exclude sensitive data
    const { passwordHash: _ph, refreshTokenHash: _rth, ...result } = user.toObject();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.userId, updateUserDto);
    // Exclude sensitive data
    const { passwordHash: _ph, refreshTokenHash: _rth, ...result } = user.toObject();
    return result;
  }
}
