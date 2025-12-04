import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
