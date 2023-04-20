import React from "react";
import "./Exchange.css";
import Tab from "../../components/Tab/Tab";

const Exchange = () => {
  return (
    <div>
      <div className="exchange w-full h-full py-5 px-5">
        <div className="lg:grid lg:grid-cols-3">
          <div className="lg:col-span-2 left-side">01</div>
          <div className="right-side">
            <div className="w-full overflow-hidden">
              <Tab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
