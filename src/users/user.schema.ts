import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string; // This will store the hashed password
}

export const UserSchema = SchemaFactory.createForClass(User);
