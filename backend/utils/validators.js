export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
};

export const validateLanguage = (language) => {
  return ["english", "twi"].includes(language.toLowerCase());
};

export const validateServiceType = (type) => {
  return ["machinery", "software", "other"].includes(type.toLowerCase());
};
