import UserSession from "../models/UserSession.js";
import {
  getLocalizedMessage,
  setLanguage,
} from "../controllers/languageController.js";
import {
  getServices,
  getServiceDetails,
} from "../controllers/serviceController.js";
import CompanyInfo from "../models/CompanyInfo.js";

export const processUSSDInput = async (
  sessionId,
  serviceCode,
  phoneNumber,
  text
) => {
  console.log("Processing USSD input:", {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  });
  try {
    let session = await UserSession.findOne({ sessionId });
    if (!session) {
      console.log("Creating new session");
      session = await UserSession.create({ sessionId, phoneNumber });
    } else {
      console.log("Existing session found:", session);
    }

    // Handle initial USSD code or reset
    if (text === "*384#" || (serviceCode === "*384#" && text === "")) {
      console.log("Handling initial USSD code or reset");
      session.lastMenuPosition = "main";
      await session.save();
      return getMainMenu(session.languagePreference);
    }

    console.log("Current menu position:", session.lastMenuPosition);

    // Handle menu selections
    if (session.lastMenuPosition === "main") {
      console.log("Handling main menu selection");
      return handleMainMenu(session, text);
    } else if (session.lastMenuPosition === "language") {
      console.log("Handling language selection");
      return handleLanguageSelection(session, text);
    } else if (session.lastMenuPosition === "services") {
      console.log("Handling service selection");
      return handleServiceSelection(session, text);
    }

    // If we reach here, something went wrong
    console.error("Unexpected menu position:", session.lastMenuPosition);
    return "An error occurred. Please try again.";
  } catch (error) {
    console.error("Error processing USSD input:", error);
    return "An error occurred. Please try again later.";
  }
};

const getMainMenu = async (language) => {
  const menu = [
    getLocalizedMessage("MAIN_MENU", language),
    "1. " + getLocalizedMessage("ABOUT_US", language),
    "2. " + getLocalizedMessage("OUR_SERVICES", language),
    "3. " + getLocalizedMessage("CONTACT_US", language),
    "4. " + getLocalizedMessage("CHANGE_LANGUAGE", language),
  ].join("\n");

  return menu;
};

const handleMainMenu = async (session, input) => {
  switch (input) {
    case "1":
      return await handleAboutUs(session);
    case "2":
      session.lastMenuPosition = "services";
      await session.save();
      return await getServices(session.languagePreference);
    case "3":
      return await handleContactUs(session);
    case "4":
      session.lastMenuPosition = "language";
      await session.save();
      return (
        getLocalizedMessage("SELECT_LANGUAGE", session.languagePreference) +
        "\n0. " +
        getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
      );
    case "0":
      return await getMainMenu(session.languagePreference);
    default:
      return (
        getLocalizedMessage("INVALID_INPUT", session.languagePreference) +
        "\n\n" +
        (await getMainMenu(session.languagePreference))
      );
  }
};

const handleLanguageSelection = async (session, input) => {
  if (input === "1" || input === "2") {
    const language = input === "1" ? "english" : "twi";
    await setLanguage(session.sessionId, language);
    session.lastMenuPosition = "main";
    await session.save();
    return await getMainMenu(language);
  } else if (input === "0") {
    session.lastMenuPosition = "main";
    await session.save();
    return await getMainMenu(session.languagePreference);
  } else {
    return (
      getLocalizedMessage("INVALID_LANGUAGE", session.languagePreference) +
      "\n\n" +
      getLocalizedMessage("SELECT_LANGUAGE", session.languagePreference) +
      "\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
    );
  }
};

const handleServiceSelection = async (session, input) => {
  if (input === "0") {
    session.lastMenuPosition = "main";
    await session.save();
    return await getMainMenu(session.languagePreference);
  }

  const inputNumber = parseInt(input);
  if (isNaN(inputNumber) || inputNumber < 1) {
    return (
      getLocalizedMessage("INVALID_SERVICE", session.languagePreference) +
      "\n\n" +
      (await getServices(session.languagePreference))
    );
  }

  const serviceDetails = await getServiceDetails(
    inputNumber - 1,
    session.languagePreference
  );
  return serviceDetails;
};

const handleAboutUs = async (session) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      console.error("Company information not found in the database");
      return (
        getLocalizedMessage(
          "COMPANY_INFO_NOT_FOUND",
          session.languagePreference
        ) +
        "\n\n0. " +
        getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
      );
    }
    const aboutUs =
      session.languagePreference === "twi"
        ? companyInfo.aboutUsTwi
        : companyInfo.aboutUsEnglish;
    return (
      aboutUs +
      "\n\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
    );
  } catch (error) {
    console.error("Error fetching company information:", error);
    return (
      getLocalizedMessage("ERROR", session.languagePreference) +
      "\n\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
    );
  }
};

const handleContactUs = async (session) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      console.error("Company information not found in the database");
      return (
        getLocalizedMessage(
          "COMPANY_INFO_NOT_FOUND",
          session.languagePreference
        ) +
        "\n\n0. " +
        getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
      );
    }
    const contactMessage = getLocalizedMessage(
      "CONTACT_MESSAGE",
      session.languagePreference
    );
    return (
      contactMessage +
      "\n" +
      companyInfo.contactNumber +
      "\n\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
    );
  } catch (error) {
    console.error("Error fetching company information:", error);
    return (
      getLocalizedMessage("ERROR", session.languagePreference) +
      "\n\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", session.languagePreference)
    );
  }
};
