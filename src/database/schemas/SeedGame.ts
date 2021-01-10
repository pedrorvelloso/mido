import mongoose, { Document, Schema, Model } from 'mongoose';

export type SeedGameAttributes = {
  seedId: number;
  seedUrl: string;
  game: 'oot';
  type: 'started' | 'finished' | 'canceled';
};

export type SeedDocument = Document & SeedGameAttributes;

type SeedModel = Model<SeedDocument>;

const SeedSchema = new Schema(
  {
    seedId: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },
    seedUrl: {
      type: String,
      trim: true,
      required: true,
    },
    game: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<SeedDocument, SeedModel>('SeedGame', SeedSchema);
