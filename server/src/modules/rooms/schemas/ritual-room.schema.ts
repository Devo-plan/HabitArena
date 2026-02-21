import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RitualRoomDocument = RitualRoom & Document;

@Schema({ timestamps: true })
export class RitualRoom {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({ trim: true, maxlength: 500, default: '' })
  description: string;

  /** Habit names or identifiers for this room */
  @Prop({ type: [String], default: [] })
  habits: string[];

  /** User IDs who are members of the room */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: Types.ObjectId[];

  /** User who created the room */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const RitualRoomSchema = SchemaFactory.createForClass(RitualRoom);

RitualRoomSchema.index({ name: 1 });
RitualRoomSchema.index({ createdBy: 1 });
RitualRoomSchema.index({ members: 1 });
