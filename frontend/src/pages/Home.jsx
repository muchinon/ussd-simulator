import React from "react";
import USSDSimulator from "../components/USSDSimulator";

function Home() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Husk USSD Simulator
      </h1>
      <USSDSimulator />
    </div>
  );
}

export default Home;
