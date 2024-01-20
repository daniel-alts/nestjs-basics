import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TodoDocument = Todo & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Todo {
  _id: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, enum: ['pending', 'completed'] })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
