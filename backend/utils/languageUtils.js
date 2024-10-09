const translations = {
  WELCOME_MESSAGE: {
    english: "Welcome to Agritech USSD Service",
    twi: "Akwaaba Agritech USSD Ɔsom",
  },
  MAIN_MENU: {
    english: "Main Menu:",
    twi: "Amansan no mu ahyɛde:",
  },
  ABOUT_US: {
    english: "About Us",
    twi: "Yɛn Ho Nsɛm",
  },
  OUR_SERVICES: {
    english: "Our Services",
    twi: "Yɛn Nsom",
  },
  CONTACT_US: {
    english: "Contact Us",
    twi: "Yɛn Ho Nsɛm",
  },
  CHANGE_LANGUAGE: {
    english: "Change Language",
    twi: "Sesa Kasa",
  },
  SELECT_LANGUAGE: {
    english: "Select Language:\n1. English\n2. Twi",
    twi: "Yi Kasa:\n1. English\n2. Twi",
  },
  INVALID_INPUT: {
    english: "Invalid input. Please try again.",
    twi: "Meda wo ase, yɛpɛ sɛ woyɛ bio.",
  },
  INVALID_LANGUAGE: {
    english: "Invalid language selection. Please try again.",
    twi: "Kasa a woayi no nyɛ papa. Yɛpɛ sɛ woyɛ bio.",
  },
  INVALID_SERVICE: {
    english: "Invalid service selection. Please try again.",
    twi: "Ɔsom a woayi no nyɛ papa. Yɛpɛ sɛ woyɛ bio.",
  },
  CONTACT_MESSAGE: {
    english: "You can reach us at:",
    twi: "Wobɛtumi anya yɛn wɔ:",
  },
  ERROR: {
    english: "An error occurred. Please try again later.",
    twi: "Mfomso bi asi. Yɛsrɛ wo, sɔ hwɛ bio akyiri yi.",
  },
  LANGUAGE_SET: {
    english: "Language set to English",
    twi: "Wo de kasa no ato Twi so",
  },
  SERVICE_NOT_FOUND: {
    english: "Service not found",
    twi: "Woannya ɔsom no",
  },
  COMPANY_INFO_NOT_FOUND: {
    english:
      "Company information is not available at the moment. Please try again later.",
    twi: "Adwumakuo ho nsɛm nni hɔ saa bere yi. Yɛsrɛ wo, sɔ hwɛ bio akyiri yi.",
  },
  INVALID_INPUT: {
    english: "Invalid input. Please try again.",
    twi: "Meda wo ase, yɛpɛ sɛ woyɛ bio.",
  },
  MAIN_MENU: {
    english: "Main Menu:",
    twi: "Amansan no mu ahyɛde:",
  },
  BACK_TO_MAIN: {
    english: "Back to Main Menu",
    twi: "San ko Amansan no mu ahyɛde",
  },
  SERVICES_LIST: {
    english: "Our Services:",
    twi: "Yɛn Nsom:",
  },
  RETURN_TO_MAIN: {
    english: "Return to Main Menu",
    twi: "San kɔ amansan no mu ahyɛde",
  },
};

export const getTranslation = (key, language) => {
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key][language] || translations[key].english;
};
