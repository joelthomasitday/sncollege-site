import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFaculty extends Document {
  name: string;
  designation: string;
  department: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    photoUrl: { type: String },
  },
  { timestamps: true }
);

const Faculty: Model<IFaculty> =
  mongoose.models.Faculty || mongoose.model<IFaculty>("Faculty", FacultySchema);

export default Faculty;
