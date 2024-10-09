import { processUSSDInput } from "../services/ussdService.js";

export const handleUSSDRequest = async (req, res) => {
  console.log("Received USSD request:", req.body);
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    if (!sessionId || !serviceCode || !phoneNumber) {
      console.log("Missing required USSD parameters");
      throw new Error("Missing required USSD parameters");
    }
    console.log("Processing USSD input...");
    const response = await processUSSDInput(
      sessionId,
      serviceCode,
      phoneNumber,
      text
    );
    console.log("USSD response:", response);
    res.set("Content-Type", "text/plain");
    res.send(response);
  } catch (error) {
    console.error("USSD request error:", error);
    res.status(500).send("END An error occurred. Please try again later.");
  }
};
