import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  fileName: string;
  url: string;
  publicId: string;
  altText?: string;
  width?: number;
  height?: number;
  format?: string;
  fileSize?: number;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    fileName: {
      type: String,
      required: [true, 'Please provide file name'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Please provide Cloudinary secure URL'],
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, 'Please provide Cloudinary public ID'],
      unique: true,
      index: true,
      trim: true,
    },
    altText: {
      type: String,
      trim: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    format: {
      type: String,
      trim: true,
    },
    fileSize: {
      type: Number,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
