import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email?: string;
  business?: string;
  productIds?: string[];
  productName?: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    business: {
      type: String,
      trim: true,
    },
    productIds: [{ type: String }],
    productName: { type: String, trim: true },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    source: {
      type: String,
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models?.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
