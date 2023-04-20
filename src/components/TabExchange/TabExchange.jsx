import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import OrderBox from "../../pages/OrderBox/OrderBox";
import Swap from "../../pages/Swap/Swap";
import "./TabExchange.css";
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
    component: <OrderBox />,
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
    component: <OrderBox />,
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
    <div key={activeTab}>
      <ul className="grid grid-flow-col text-center main-tab">
        {tabData.map((item, idx) => {
          return (
            <li
              onClick={() => changeTab(item.value)}
              className={
                activeTab === item.value
                  ? "flex items-center justify-center cursor-pointer tab-item text-center h-full overflow-hidden active"
                  : "flex items-center justify-center cursor-pointer tab-item text-center h-full overflow-hidden "
              }
              key={idx}
            >
              {item.icon}
              <p className="flex justify-center py-1 h-full">{item.label}</p>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">{tabContent}</div>
    </div>
  );
};

export default TabExchange;
