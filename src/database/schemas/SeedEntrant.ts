import mongoose, { Document, Schema, Model } from 'mongoose';

export type SeedEntrantAttributes = {
  seedGameId: string;
  playerDiscordId: string;
  forfeit?: boolean;
  time?: string;
};

export type SeedEntrantDocument = Document & SeedEntrantAttributes;

type SeedEntrantModel = Model<SeedEntrantDocument>;

const SeedEntrantSchema = new Schema(
  {
    seedGameId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SeedGame',
    },
    playerDiscordId: {
      type: String,
      trim: true,
      required: true,
    },
    forfeit: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<SeedEntrantDocument, SeedEntrantModel>(
  'SeedEntrant',
  SeedEntrantSchema,
);
