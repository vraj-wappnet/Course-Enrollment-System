import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string; // Explicitly declare _id to match Mongoose's document ID

  @Prop({ type: String, default: () => uuidv4(), unique: true })
  user_id: string; // Unique user_id generated for each user

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'student' })
  role: string; // 'student' or 'admin'
}

export const UserSchema = SchemaFactory.createForClass(User);
