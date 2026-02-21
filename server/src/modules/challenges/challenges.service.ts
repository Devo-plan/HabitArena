import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Challenge, ChallengeDocument, ChallengeStatus } from './schemas/challenge.schema';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ListChallengesDto } from './dto/list-challenges.dto';

function computeStatus(startDate: Date, endDate: Date): ChallengeStatus {
  const now = new Date();
  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'ended';
  return 'active';
}

@Injectable()
export class ChallengesService {
  constructor(@InjectModel(Challenge.name) private challengeModel: Model<ChallengeDocument>) {}

  async create(dto: CreateChallengeDto, userId: string): Promise<ChallengeDocument> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (start >= end) {
      throw new BadRequestException('startDate must be before endDate');
    }
    const status = computeStatus(start, end);
    const challenge = await this.challengeModel.create({
      ...dto,
      startDate: start,
      endDate: end,
      status,
      createdBy: new Types.ObjectId(userId),
      participants: [],
      participantProgress: [],
    });
    return challenge;
  }

  async findAll(dto: ListChallengesDto) {
    const { page = 1, limit = 20, status, season, search } = dto;
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (season) filter.season = season;
    if (search?.trim()) {
      filter.name = { $regex: search.trim(), $options: 'i' };
    }

    const [items, total] = await Promise.all([
      this.challengeModel
        .find(filter)
        .sort({ startDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'displayName email')
        .populate('participants', 'displayName')
        .lean()
        .exec(),
      this.challengeModel.countDocuments(filter).exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<ChallengeDocument> {
    const challenge = await this.challengeModel
      .findById(id)
      .populate('createdBy', 'displayName email')
      .populate('participants', 'displayName')
      .exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  async update(id: string, dto: UpdateChallengeDto, userId: string): Promise<ChallengeDocument> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    if (challenge.createdBy.toString() !== userId) {
      throw new ForbiddenException('Only the creator can update this challenge');
    }

    const updates: Record<string, unknown> = { ...dto };
    if (dto.startDate) updates.startDate = new Date(dto.startDate);
    if (dto.endDate) updates.endDate = new Date(dto.endDate);

    if (updates.startDate && updates.endDate) {
      const start = updates.startDate as Date;
      const end = updates.endDate as Date;
      if (start >= end) {
        throw new BadRequestException('startDate must be before endDate');
      }
      (updates as Record<string, unknown>).status = computeStatus(start, end);
    } else if (dto.startDate || dto.endDate) {
      const start = (updates.startDate as Date) ?? challenge.startDate;
      const end = (updates.endDate as Date) ?? challenge.endDate;
      if (start >= end) {
        throw new BadRequestException('startDate must be before endDate');
      }
      (updates as Record<string, unknown>).status = computeStatus(start, end);
    }

    const updated = await this.challengeModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate('createdBy', 'displayName email')
      .populate('participants', 'displayName')
      .exec();
    return updated!;
  }

  async remove(id: string, userId: string): Promise<void> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    if (challenge.createdBy.toString() !== userId) {
      throw new ForbiddenException('Only the creator can delete this challenge');
    }
    await this.challengeModel.findByIdAndDelete(id).exec();
  }

  async join(id: string, userId: string): Promise<ChallengeDocument> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    const uid = new Types.ObjectId(userId);
    if (challenge.participants.some((p) => p.equals(uid))) {
      throw new ConflictException('Already a participant');
    }
    if (challenge.status === 'ended') {
      throw new BadRequestException('Cannot join an ended challenge');
    }

    challenge.participants.push(uid);
    challenge.participantProgress.push({
      userId: uid,
      progress: 0,
      lastUpdatedAt: new Date(),
    });
    await challenge.save();

    return this.challengeModel
      .findById(id)
      .populate('createdBy', 'displayName email')
      .populate('participants', 'displayName')
      .exec() as Promise<ChallengeDocument>;
  }

  async leave(id: string, userId: string): Promise<ChallengeDocument> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    const uid = new Types.ObjectId(userId);
    const idx = challenge.participants.findIndex((p) => p.equals(uid));
    if (idx === -1) {
      throw new ConflictException('Not a participant');
    }

    challenge.participants.splice(idx, 1);
    challenge.participantProgress = challenge.participantProgress.filter(
      (p) => !p.userId.equals(uid)
    );
    await challenge.save();

    return this.challengeModel
      .findById(id)
      .populate('createdBy', 'displayName email')
      .populate('participants', 'displayName')
      .exec() as Promise<ChallengeDocument>;
  }

  async updateProgress(id: string, userId: string, progress: number): Promise<ChallengeDocument> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    const uid = new Types.ObjectId(userId);
    const entry = challenge.participantProgress.find((p) => p.userId.equals(uid));
    if (!entry) {
      throw new ForbiddenException('You must join the challenge first');
    }

    entry.progress = progress;
    entry.lastUpdatedAt = new Date();
    if (progress >= 100) {
      entry.completedAt = new Date();
    }
    await challenge.save();

    return this.challengeModel
      .findById(id)
      .populate('createdBy', 'displayName email')
      .populate('participants', 'displayName')
      .exec() as Promise<ChallengeDocument>;
  }

  async getMyChallenges(userId: string, dto: ListChallengesDto) {
    const { page = 1, limit = 20, status, season } = dto;
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {
      participants: new Types.ObjectId(userId),
    };
    if (status) filter.status = status;
    if (season) filter.season = season;

    const [items, total] = await Promise.all([
      this.challengeModel
        .find(filter)
        .sort({ startDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'displayName email')
        .populate('participants', 'displayName')
        .lean()
        .exec(),
      this.challengeModel.countDocuments(filter).exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
