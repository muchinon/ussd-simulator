import React from "react";

function USSDDisplay({ content }) {
  return (
    <div className="ussd-display bg-gray-100 border border-gray-300 rounded-md p-4 h-48 overflow-y-auto">
      <pre className="font-mono text-sm whitespace-pre-wrap">{content}</pre>
    </div>
  );
}

export default USSDDisplay;
