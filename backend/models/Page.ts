import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPage extends Document {
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;
