import React from "react";
import InputComponent from "../../components/common/InputComponent";
import SelectToken from "../../components/common/SelectToken";
import BTC from "../../img/btc.png";
import BNB from "../../img/CAKE.png";
import ETH from "../../img/WETH.png";

const Swap = () => {
  return (
    <div>
      <InputComponent
        tooltip="Price"
        label="Price"
        placeHolder="0"
        rightAction={
          <SelectToken
            options={[
              { label: "BTC", value: "BTC", icon: BTC },
              { label: "BNB", value: "BNB", icon: BNB },
              { label: "ETH", value: "ETH", icon: ETH },
            ]}
            defaultValue={"BTC"}
          />
        }
      />
    </div>
  );
};

export default Swap;
