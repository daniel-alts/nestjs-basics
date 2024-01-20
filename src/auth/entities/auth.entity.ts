import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AuthDocument = Auth & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Auth {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
