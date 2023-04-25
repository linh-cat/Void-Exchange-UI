import React from "react";
import SelectToken from "../../components/common/SelectToken";
import BTC from "../../img/btc.png";
import BNB from "../../img/CAKE.png";
import ETH from "../../img/WETH.png";
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
