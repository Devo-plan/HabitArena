import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Squad, SquadDocument } from './schemas/squad.schema';
import { CreateSquadDto } from './dto/create-squad.dto';
import { JoinSquadDto } from './dto/join-squad.dto';
import * as crypto from 'crypto';

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

  async findAll(): Promise<any[]> {
    // Exclude inviteCode from public listing
    const squads = await this.squadModel
      .find()
      .populate('admin', 'displayName email')
      .select('-inviteCode')
      .exec();
    return squads;
  }

  async findOne(id: string, requesterId: string): Promise<any> {
    const squad = await this.squadModel
      .findById(id)
      .populate('admin', 'displayName email')
      .populate('members', 'displayName email')
      .exec();

    if (!squad) {
      throw new NotFoundException(`Squad with ID ${id} not found`);
    }

    // Convert to object to manipulate visibility
    const squadObj = squad.toObject();

    // Only show inviteCode to the admin
    if (
      squad.admin &&
      (squad.admin as any)._id.toString() !== requesterId &&
      (squad.admin as any) !== requesterId
    ) {
      delete (squadObj as any).inviteCode;
    }

    return squadObj;
  }

  async join(joinSquadDto: JoinSquadDto, userId: string): Promise<SquadDocument> {
    const squad = await this.squadModel.findOne({ inviteCode: joinSquadDto.inviteCode });
    if (!squad) {
      throw new NotFoundException(`Squad with invite code ${joinSquadDto.inviteCode} not found`);
    }

    if (squad.members.some((memberId: any) => memberId.toString() === userId)) {
      throw new ConflictException('User is already a member of this squad');
    }

    squad.members.push(userId as any);
    return squad.save();
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
