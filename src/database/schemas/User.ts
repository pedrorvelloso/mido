import mongoose, { Document, Schema, Model } from 'mongoose';

export type UserAttributes = {
  name: string;
  playerDiscordId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    playerDiscordId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
