import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  externalId?: string;
  name: string;
  slug: string;
  sku?: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  image: string;
  images?: string[];
  tags?: string[];
  featured: boolean;
  popular: boolean;
  isNewProduct: boolean;
  available: boolean;
  unit?: string;
  packSize?: string;
  sortOrder?: number;
  imageStatus: 'provided' | 'generated' | 'missing' | 'failed';
  imageSource?: 'csv' | 'manual' | 'generated';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    externalId: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    sku: {
      type: String,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: 'New Pashupati',
    },
    image: {
      type: String,
      default: '',
    },
    images: [{ type: String }],
    tags: [{ type: String }],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    popular: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
      index: true,
    },
    unit: String,
    packSize: String,
    sortOrder: {
      type: Number,
      default: 0,
    },
    imageStatus: {
      type: String,
      enum: ['provided', 'generated', 'missing', 'failed'],
      default: 'missing',
      index: true,
    },
    imageSource: {
      type: String,
      enum: ['csv', 'manual', 'generated'],
      default: 'csv',
    },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
