const API_URL = import.meta.env.VITE_API_BASE_URL;

export const sendUSSDRequest = async (input) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: "mockSessionId",
        serviceCode: "*384#",
        phoneNumber: "mockPhoneNumber",
        text: input,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Error sending USSD request:", error);
    throw error;
  }
};
