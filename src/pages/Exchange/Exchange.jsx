import React from "react";
import "./Exchange.css";
import TabExchange from "../../components/TabExchange/TabExchange";
import ExchangeTopChart from "./ExchangeTopChart";

const Exchange = () => {
  return (
    <div className="exchange w-full h-full p-0 md:p-5">
      <div className="md:mb-3">
        <ExchangeTopChart />
      </div>
      <div className="lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <div className="lg:col-span-2 xl:col-span-4 left-side"></div>
        <div className="right-side">
          <div className="w-full bg-card">
            <TabExchange defaultValue="long" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
