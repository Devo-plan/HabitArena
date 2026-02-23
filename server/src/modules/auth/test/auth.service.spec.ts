import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

vi.mock('bcrypt', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof bcrypt;
  return {
    ...actual,
    genSalt: vi.fn().mockResolvedValue('salt'),
    hash: vi.fn().mockResolvedValue('hashed-value'),
    compare: vi.fn(),
  };
});

const mockUser = {
  _id: { toString: () => 'user-123' },
  email: 'test@example.com',
  passwordHash: '$2b$10$hashed',
  displayName: 'Test User',
  refreshTokenHash: undefined,
};

const mockUsersService = {
  findByEmail: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  updateRefreshToken: vi.fn(),
};

const mockJwtService = {
  signAsync: vi.fn().mockResolvedValue('mock-token'),
};

const mockConfigService = {
  get: vi.fn((key: string) => {
    if (key === 'JWT_SECRET') return 'test-secret';
    if (key === 'JWT_REFRESH_SECRET') return 'test-refresh-secret';
    if (key === 'JWT_ACCESS_EXPIRY') return '15m';
    if (key === 'JWT_REFRESH_EXPIRY') return '7d';
    return undefined;
  }),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockJwtService.signAsync.mockResolvedValue('mock-token');
    service = new AuthService(
      mockUsersService as unknown as UsersService,
      mockJwtService as unknown as JwtService,
      mockConfigService as unknown as ConfigService
    );
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      email: 'new@example.com',
      password: 'password123',
      displayName: 'New User',
    };

    it('should register a new user and return tokens', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        ...mockUser,
        _id: { toString: () => 'new-user-id' },
        email: registerDto.email,
        displayName: registerDto.displayName,
      });

      const result = await service.register(registerDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(mockUsersService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: registerDto.email,
          displayName: registerDto.displayName,
        })
      );
      expect(mockUsersService.create.mock.calls[0][0].passwordHash).toBeDefined();
      expect(mockUsersService.updateRefreshToken).toHaveBeenCalledWith(
        'new-user-id',
        'hashed-value'
      );
      expect(result).toEqual({ access_token: 'mock-token', refresh_token: 'mock-token' });
    });

    it('should throw BadRequestException when email already exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException);
      await expect(service.register(registerDto)).rejects.toThrow('User already exists');
      expect(mockUsersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return tokens when credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await service.login(loginDto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockUsersService.updateRefreshToken).toHaveBeenCalledWith('user-123', 'hashed-value');
      expect(result).toEqual({ access_token: 'mock-token', refresh_token: 'mock-token' });
    });

    it('should throw BadRequestException when user does not exist', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
      await expect(service.login(loginDto)).rejects.toThrow('Invalid email or password');
      expect(mockUsersService.updateRefreshToken).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when password does not match', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
      await expect(service.login(loginDto)).rejects.toThrow('Invalid email or password');
      expect(mockUsersService.updateRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call updateRefreshToken with null', async () => {
      mockUsersService.updateRefreshToken.mockResolvedValue(undefined);

      await service.logout('user-123');

      expect(mockUsersService.updateRefreshToken).toHaveBeenCalledWith('user-123', null);
    });
  });

  describe('refreshTokens', () => {
    it('should return new tokens when refresh token is valid', async () => {
      mockUsersService.findById.mockResolvedValue({
        ...mockUser,
        refreshTokenHash: '$2b$10$hashed-rt',
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await service.refreshTokens('user-123', 'valid-refresh-token');

      expect(mockUsersService.findById).toHaveBeenCalledWith('user-123');
      expect(mockUsersService.updateRefreshToken).toHaveBeenCalledWith('user-123', 'hashed-value');
      expect(result).toEqual({ access_token: 'mock-token', refresh_token: 'mock-token' });
    });

    it('should throw ForbiddenException when user not found', async () => {
      mockUsersService.findById.mockResolvedValue(null);

      await expect(service.refreshTokens('user-123', 'token')).rejects.toThrow(ForbiddenException);
      await expect(service.refreshTokens('user-123', 'token')).rejects.toThrow('Access Denied');
      expect(mockUsersService.updateRefreshToken).not.toHaveBeenCalled();
    });

    it('should throw ForbiddenException when user has no refreshTokenHash', async () => {
      mockUsersService.findById.mockResolvedValue({
        ...mockUser,
        refreshTokenHash: undefined,
      });

      await expect(service.refreshTokens('user-123', 'token')).rejects.toThrow(ForbiddenException);
      await expect(service.refreshTokens('user-123', 'token')).rejects.toThrow('Access Denied');
    });

    it('should throw ForbiddenException when refresh token does not match', async () => {
      mockUsersService.findById.mockResolvedValue({
        ...mockUser,
        refreshTokenHash: '$2b$10$hashed-rt',
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(service.refreshTokens('user-123', 'wrong-token')).rejects.toThrow(
        ForbiddenException
      );
      await expect(service.refreshTokens('user-123', 'wrong-token')).rejects.toThrow(
        'Access Denied'
      );
      expect(mockUsersService.updateRefreshToken).not.toHaveBeenCalled();
    });
  });
});
