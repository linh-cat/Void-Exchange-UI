import ArrowTrendingUpIcon from "@img/icons/ArrowTrendingUp.svg";
import ArrowRightLeftIcon from "@img/icons/ArrowRightLeft.svg";
import ArrowTrendingDown from "@img/icons/ArrowTredingDown.svg";
import React, { useMemo, useState } from "react";
import OrderBox from "../../pages/OrderBox/OrderBox";
import Swap from "../../pages/Swap/Swap";
import "./TabExchange.css";
import { TYPE_ORDER } from "../../constant/tab";

const tabData = [
  {
    label: "Long",
    value: "long",
    icon: ArrowTrendingUpIcon,
    component: <OrderBox type={TYPE_ORDER.LONG} />,
  },
  {
    label: "Short",
    value: "short",
    icon: ArrowTrendingDown,
    component: <OrderBox type={TYPE_ORDER.SHORT} />,
  },
  {
    label: "Swap",
    value: "swap",
    icon: ArrowRightLeftIcon,
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
    <div
      key={activeTab}
      className="w-full h-full border-l border-b border-gray-700"
    >
      <div className="order-tab">
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
                <img src={item.icon} alt="icon" className="w-5" />
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
