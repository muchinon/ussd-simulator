import Service from "../models/Service.js";
import CompanyInfo from "../models/CompanyInfo.js";

export const seedDatabase = async () => {
  try {
    // Seed Company Info
    const companyInfo = {
      aboutUsEnglish:
        "Husk Technologies is a leading provider of agricultural technology solutions in Ghana.",
      aboutUsTwi:
        "Husk Technologies yɛ adwumakuo a ɛdi kan wɔ kuadwuma mu technology nhyehyɛe mu wɔ Ghana.",
      contactNumber: "+233123456789",
    };
    await CompanyInfo.findOneAndUpdate({}, companyInfo, { upsert: true });

    // Seed Services
    const services = [
      {
        name: "Solar Cocoa Pod Breaking Machine",
        descriptionEnglish:
          "Efficient solar-powered machine for breaking cocoa pods.",
        descriptionTwi: "Anodisɛm a ɛyɛ adwuma yie de bɔ kokoo aba mu.",
        type: "machinery",
      },
      {
        name: "SAT2FARM App",
        descriptionEnglish:
          "Mobile app for precision agriculture and farm management.",
        descriptionTwi: "Mobile app a wɔde hwɛ afuo so yie.",
        type: "software",
      },
    ];

    for (const service of services) {
      await Service.findOneAndUpdate({ name: service.name }, service, {
        upsert: true,
      });
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
