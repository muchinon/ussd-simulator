import React, { useState } from "react";
import USSDDisplay from "./USSDDisplay";
import { sendUSSDRequest } from "../services/api";

function USSDSimulator() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("Welcome to USSD Agritech Simulator");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sendUSSDRequest(input);
      setDisplay(response);
    } catch (error) {
      setDisplay("An error occurred. Please try again.");
    }
    setLoading(false);
    setInput("");
  };

  return (
    <div className="ussd-simulator space-y-4">
      <USSDDisplay content={display} />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter USSD code or response"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default USSDSimulator;
