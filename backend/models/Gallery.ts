import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
