import React from "react";
import "./Badge.css";

const Badge = ({ text }) => {
  return (
    <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md badge">
      {text}
    </span>
  );
};

export default Badge;
