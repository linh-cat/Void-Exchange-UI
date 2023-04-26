import React from "react";
import ExchangeTopChart from "./ExchangeTopChart";

const ExchangeTVChart = () => {
  return (
    <div className="exchange-container">
      <div className="h-15">
        <ExchangeTopChart />
      </div>
      <div className="exchange-chart"></div>
    </div>
  );
};

export default ExchangeTVChart;
