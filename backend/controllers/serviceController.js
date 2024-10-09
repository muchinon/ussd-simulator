import Service from "../models/Service.js";
import { getLocalizedMessage } from "./languageController.js";

export const getServices = async (language) => {
  try {
    const services = await Service.find();
    let serviceList = getLocalizedMessage("SERVICES_LIST", language) + "\n";
    serviceList += services
      .map((service, index) => {
        return `${index + 1}. ${service.name}`;
      })
      .join("\n");
    serviceList += "\n0. " + getLocalizedMessage("RETURN_TO_MAIN", language);
    return serviceList;
  } catch (error) {
    console.error("Error fetching services:", error);
    return (
      getLocalizedMessage("ERROR", language) +
      "\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", language)
    );
  }
};

export const getServiceDetails = async (index, language) => {
  try {
    const services = await Service.find();
    if (index < 0 || index >= services.length) {
      return (
        getLocalizedMessage("SERVICE_NOT_FOUND", language) +
        "\n0. " +
        getLocalizedMessage("RETURN_TO_MAIN", language)
      );
    }
    const service = services[index];
    const description =
      language === "twi" ? service.descriptionTwi : service.descriptionEnglish;
    return `${service.name}\n\n${description}\n\n0. ${getLocalizedMessage(
      "RETURN_TO_MAIN",
      language
    )}`;
  } catch (error) {
    console.error("Error fetching service details:", error);
    return (
      getLocalizedMessage("ERROR", language) +
      "\n0. " +
      getLocalizedMessage("RETURN_TO_MAIN", language)
    );
  }
};
