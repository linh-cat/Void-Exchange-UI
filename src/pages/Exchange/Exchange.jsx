import React from "react";
import "./Exchange.css";
import TabExchange from "../../components/TabExchange/TabExchange";

const Exchange = () => {
  return (
    <div>
      <div className="exchange w-full h-full py-5 px-5">
        <div className="lg:grid lg:grid-cols-3">
          <div className="lg:col-span-2 left-side">01</div>
          <div className="right-side">
            <div className="w-full overflow-hidden bg-gray-900 p-3">
              <TabExchange defaultValue="long" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
