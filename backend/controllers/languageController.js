import UserSession from "../models/UserSession.js";
import { getTranslation } from "../utils/languageUtils.js";

export const setLanguage = async (sessionId, language) => {
  try {
    await UserSession.findOneAndUpdate(
      { sessionId },
      { languagePreference: language },
      { upsert: true, new: true }
    );
    return getLocalizedMessage("LANGUAGE_SET", language);
  } catch (error) {
    console.error("Error setting language:", error);
    return getLocalizedMessage("ERROR", language);
  }
};

export const getLocalizedMessage = (key, language) => {
  return getTranslation(key, language);
};
