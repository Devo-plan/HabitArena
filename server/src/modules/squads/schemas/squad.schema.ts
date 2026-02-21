import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type SquadDocument = Squad & Document;

@Schema({ timestamps: true })
export class Squad {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }], default: [] })
  members: User[];

  @Prop({ required: true, unique: true })
  inviteCode: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  admin: User;
}

export const SquadSchema = SchemaFactory.createForClass(Squad);
