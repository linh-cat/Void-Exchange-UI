import React from "react";
import "./Exchange.css";
import TabExchange from "../../components/TabExchange/TabExchange";
import ExchangeTVChart from "./ExchangeTVChart";

const Exchange = () => {
  return (
    <div className="exchange w-full h-full p-0 md:p-5">
      <div className="lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <div className="lg:col-span-2 xl:col-span-4 left-side">
          <ExchangeTVChart />
        </div>
        <div className="right-side">
          <div className="w-full p-5 bg-card">
            <TabExchange defaultValue="long" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
