import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  duration: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
