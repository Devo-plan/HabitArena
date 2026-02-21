import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RitualRoom, RitualRoomDocument } from './schemas/ritual-room.schema';
import { CreateRitualRoomDto } from './dto/create-ritual-room.dto';
import { UpdateRitualRoomDto } from './dto/update-ritual-room.dto';
import { ListRoomsQueryDto } from './dto/list-rooms-query.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(RitualRoom.name)
    private readonly ritualRoomModel: Model<RitualRoomDocument>
  ) {}

  async create(dto: CreateRitualRoomDto, userId: string): Promise<RitualRoomDocument> {
    const createdBy = new Types.ObjectId(userId);
    const room = new this.ritualRoomModel({
      ...dto,
      createdBy,
      members: [createdBy],
    });
    return room.save();
  }

  async findAll(query: ListRoomsQueryDto): Promise<{ rooms: RitualRoom[]; total: number }> {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;
    const [rooms, total] = await Promise.all([
      this.ritualRoomModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'email')
        .populate('members', 'email')
        .lean()
        .exec(),
      this.ritualRoomModel.countDocuments().exec(),
    ]);
    return {
      rooms,
      total,
    };
  }

  async findOne(id: string): Promise<RitualRoomDocument> {
    const room = await this.ritualRoomModel
      .findById(id)
      .populate('createdBy', 'email')
      .populate('members', 'email')
      .exec();
    if (!room) {
      throw new NotFoundException('Ritual room not found');
    }
    return room;
  }

  async update(id: string, dto: UpdateRitualRoomDto, userId: string): Promise<RitualRoomDocument> {
    const room = await this.ritualRoomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Ritual room not found');
    }
    if (!room.createdBy.equals(new Types.ObjectId(userId))) {
      throw new ForbiddenException('Only the room creator can update it');
    }
    Object.assign(room, dto);
    return room.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const room = await this.ritualRoomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Ritual room not found');
    }
    if (!room.createdBy.equals(new Types.ObjectId(userId))) {
      throw new ForbiddenException('Only the room creator can delete it');
    }
    await this.ritualRoomModel.findByIdAndDelete(id).exec();
  }

  async joinRoom(roomId: string, userId: string): Promise<RitualRoomDocument> {
    const room = await this.ritualRoomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException('Ritual room not found');
    }
    const uid = new Types.ObjectId(userId);
    if (room.members.some((m) => m.equals(uid))) {
      throw new ConflictException('You are already a member of this room');
    }
    room.members.push(uid);
    return room.save();
  }

  async leaveRoom(roomId: string, userId: string): Promise<RitualRoomDocument> {
    const room = await this.ritualRoomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException('Ritual room not found');
    }
    const uid = new Types.ObjectId(userId);
    const index = room.members.findIndex((m) => m.equals(uid));
    if (index === -1) {
      throw new ConflictException('You are not a member of this room');
    }
    room.members.splice(index, 1);
    return room.save();
  }
}
