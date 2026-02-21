import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

export type ChallengeStatus = 'draft' | 'active' | 'ended' | 'upcoming';

export interface ParticipantProgress {
  userId: Types.ObjectId;
  progress: number; // 0-100 or custom metric
  completedAt?: Date;
  lastUpdatedAt: Date;
}

@Schema({ timestamps: true })
export class Challenge {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ trim: true })
  season?: string; // e.g. "Winter 2025", "Q1 2025"

  @Prop({ type: String, default: 'active' })
  status: ChallengeStatus;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  participants: Types.ObjectId[];

  @Prop({
    type: [
      {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        progress: { type: Number, default: 0 },
        completedAt: { type: Date, required: false },
        lastUpdatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  participantProgress: ParticipantProgress[];

  @Prop({ type: Object, default: {} })
  rules?: Record<string, unknown>; // flexible rules config

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

ChallengeSchema.index({ startDate: 1, endDate: 1 });
ChallengeSchema.index({ status: 1 });
ChallengeSchema.index({ season: 1 });
ChallengeSchema.index({ participants: 1 });
ChallengeSchema.index({ createdBy: 1 });
