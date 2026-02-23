import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Squad, SquadDocument } from './schemas/squad.schema';
import { User } from '../users/schemas/user.schema';
import { CreateSquadDto } from './dto/create-squad.dto';
import { JoinSquadDto } from './dto/join-squad.dto';
import * as crypto from 'crypto';
import { Types } from 'mongoose';

@Injectable()
export class SquadsService {
  constructor(@InjectModel(Squad.name) private squadModel: Model<SquadDocument>) {}

  async create(createSquadDto: CreateSquadDto, adminId: string): Promise<SquadDocument> {
    // Check if a squad with the same name already exists
    const existingSquad = await this.squadModel.findOne({ name: createSquadDto.name });
    if (existingSquad) {
      throw new ConflictException('Squad with this name already exists');
    }

    const inviteCode = await this.generateUniqueInviteCode();

    const newSquad = new this.squadModel({
      ...createSquadDto,
      inviteCode,
      admin: adminId,
      members: [adminId],
    });

    return newSquad.save();
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ data: SquadDocument[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    // Exclude inviteCode from public listing and sort by newest first
    const [data, total] = await Promise.all([
      this.squadModel
        .find()
        .populate('admin', 'displayName email')
        .select('-inviteCode')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.squadModel.countDocuments().exec(),
    ]);

    return {
      data: data as unknown as SquadDocument[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, requesterId: string): Promise<Partial<Squad>> {
    const squad = await this.squadModel
      .findById(id)
      .populate('admin', 'displayName email')
      .populate('members', 'displayName email')
      .exec();

    if (!squad) {
      throw new NotFoundException(`Squad with ID ${id} not found`);
    }

    // Convert to object to manipulate visibility
    const squadObj = squad.toObject() as Squad & { _id: Types.ObjectId };

    // Only show inviteCode to the admin
    // Safe check to handle both populated (object) and unpopulated (ObjectId/string) admin field
    const adminId =
      (squad.admin as unknown as { _id?: Types.ObjectId })?._id?.toString() ||
      squad.admin?.toString();

    if (adminId !== requesterId) {
      delete (squadObj as Partial<Squad>).inviteCode;
    }

    return squadObj;
  }

  async join(joinSquadDto: JoinSquadDto, userId: string): Promise<SquadDocument> {
    const squad = await this.squadModel.findOne({ inviteCode: joinSquadDto.inviteCode });
    if (!squad) {
      throw new NotFoundException(`Squad with invite code ${joinSquadDto.inviteCode} not found`);
    }

    // Real-world: Limit squad size
    const MAX_MEMBERS = 50;
    if (squad.members.length >= MAX_MEMBERS) {
      throw new ConflictException(`Squad is full (maximum ${MAX_MEMBERS} members)`);
    }

    const isMember = squad.members.some((member) => {
      const memberId = (member as unknown as { _id?: Types.ObjectId })?._id || member;
      return memberId.toString() === userId;
    });

    if (isMember) {
      throw new ConflictException('User is already a member of this squad');
    }

    squad.members.push(userId as unknown as User);
    return squad.save();
  }

  async leave(id: string, userId: string): Promise<void> {
    const squad = await this.squadModel.findById(id);
    if (!squad) {
      throw new NotFoundException(`Squad with ID ${id} not found`);
    }

    // Real-world: Prevent admin from leaving without transferring or deleting
    const adminId =
      (squad.admin as unknown as { _id?: Types.ObjectId })?._id?.toString() ||
      squad.admin?.toString();
    if (adminId === userId) {
      throw new ForbiddenException(
        'Squad admin cannot leave. Please transfer leadership or delete the squad instead.'
      );
    }

    const initialMembersCount = squad.members.length;
    squad.members = squad.members.filter((member) => {
      const memberId = (member as unknown as { _id?: Types.ObjectId })?._id || member;
      return memberId.toString() !== userId;
    }) as User[];

    if (squad.members.length === initialMembersCount) {
      throw new NotFoundException('You are not a member of this squad');
    }

    await squad.save();
  }

  private async generateUniqueInviteCode(): Promise<string> {
    const MAX_RETRIES = 5;
    for (let i = 0; i < MAX_RETRIES; i++) {
      const code = crypto.randomBytes(3).toString('hex').toUpperCase();
      const existing = await this.squadModel.findOne({ inviteCode: code });
      if (!existing) {
        return code;
      }
    }
    throw new InternalServerErrorException(
      'Could not generate a unique invite code. Please try again.'
    );
  }
}
