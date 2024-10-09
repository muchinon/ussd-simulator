import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    descriptionEnglish: { type: String, required: true },
    descriptionTwi: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["machinery", "software", "other"],
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
