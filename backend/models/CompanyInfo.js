import mongoose from "mongoose";

const companyInfoSchema = new mongoose.Schema(
  {
    aboutUsEnglish: { type: String, required: true },
    aboutUsTwi: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const CompanyInfo = mongoose.model("CompanyInfo", companyInfoSchema);

export default CompanyInfo;
