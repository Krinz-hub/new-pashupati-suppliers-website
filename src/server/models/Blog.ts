import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category?: string;
  categoryId?: string;
  author: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide an article title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide an article slug'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [400, 'Excerpt cannot exceed 400 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content'],
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      default: 'New Pashupati Team',
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
