import CompanyInfo from "../models/CompanyInfo.js";
import { CustomError } from "../middleware/errorHandler.js";

export const getCompanyInfo = async () => {
  const companyInfo = await CompanyInfo.findOne();
  if (!companyInfo) {
    throw new CustomError("Company information not found", 404);
  }
  return companyInfo;
};

export const updateCompanyInfo = async (updateData) => {
  const companyInfo = await CompanyInfo.findOneAndUpdate({}, updateData, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return companyInfo;
};
