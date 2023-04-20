import React from "react";
import "./Exchange.css";

const Exchange = () => {
  return (
    <div>
      <div className="exchange bg-orange-300 w-full h-full">
        <div className="lg:grid lg:grid-cols-3">
          <div className="lg:col-span-2 bg-slate-400">01</div>
          <div className="bg-zinc-600">02</div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
