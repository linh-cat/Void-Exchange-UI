import React from "react";
import "./Exchange.css";
import TabExchange from "../../components/TabExchange/TabExchange";

const Exchange = () => {
  return (
    <div>
      <div className="exchange w-full h-full py-0 px-0 md:py-5 md:px-5">
        <div className="lg:grid lg:grid-cols-3 xl:grid-cols-5">
          <div className="lg:col-span-2 xl:col-span-4 left-side">01</div>
          <div className="right-side">
            <div className="w-full p-5 bg-card">
              <TabExchange defaultValue="long" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
