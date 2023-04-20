import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import { TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import React from "react";
import OrderBox from "../../pages/OrderBox/OrderBox";
import Swap from "../../pages/Swap/Swap";
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
    desc: <OrderBox />,
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
    desc: <OrderBox />,
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
    desc: <Swap />,
  },
];

const Tab = () => {
  return (
    <Tabs value="long" className="tab-parent">
      <TabsHeader className="tab-header rounded-none">
        {tabData.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="tab-header-item">
            {icon}
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="tab-body">
        {tabData.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Tab;
