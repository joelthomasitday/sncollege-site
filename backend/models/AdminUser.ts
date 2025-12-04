import mongoose, { Schema, model, models, Document, Model } from 'mongoose';

export interface IAdminUser {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminUserDocument extends IAdminUser, Document {}

const AdminUserSchema = new Schema<IAdminUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminUser: Model<IAdminUserDocument> = models.AdminUser || model<IAdminUserDocument>('AdminUser', AdminUserSchema);

export default AdminUser;
