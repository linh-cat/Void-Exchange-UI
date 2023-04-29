import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import OrderBox from "../../pages/OrderBox/OrderBox";
import Swap from "../../pages/Swap/Swap";
import "./TabExchange.css";
import { TYPE_ORDER } from "../../constant/tab";

const tabData = [
  {
    label: "Long",
    value: "long",
    icon: (
      <ArrowTrendingUpIcon
        style={{
          color: "#fff",
          width: "15px",
          display: "inline",
          marginRight: "10px",
        }}
      />
    ),
    component: <OrderBox type={TYPE_ORDER.LONG} />,
  },
  {
    label: "Short",
    value: "short",
    icon: (
      <ArrowTrendingDownIcon
        style={{
          color: "#fff",
          width: "15px",
          display: "inline",
          marginRight: "10px",
        }}
      />
    ),
    component: <OrderBox type={TYPE_ORDER.SHORT} />,
  },
  {
    label: "Swap",
    value: "swap",
    icon: (
      <ArrowsRightLeftIcon
        style={{
          color: "#fff",
          width: "15px",
          display: "inline",
          marginRight: "10px",
        }}
      />
    ),
    component: <Swap />,
  },
];

const TabExchange = ({ defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  const tabContent = useMemo(() => {
    const index = tabData.findIndex((item) => item.value === activeTab);

    return tabData[index]?.component;
  }, [activeTab]);

  return (
    <div key={activeTab} className="w-full h-full border border-gray-700">
      <div className="order-tab">
        <label className="text-center label py-1 border-b border-gray-700">
          Order Box
        </label>
        <ul className="grid grid-flow-col text-center main-tab border-b border-gray-700 mt-auto h-full">
          {tabData.map((item, idx) => {
            return (
              <li
                onClick={() => changeTab(item.value)}
                className={
                  activeTab === item.value ? "tab-item active" : "tab-item"
                }
                key={idx}
              >
                {item.icon}
                <label className="flex justify-center">{item.label}</label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tab-content p-3">{tabContent}</div>
    </div>
  );
};

export default TabExchange;
