import React from "react";
import InputCustom from "../../components/common/InputCustom";
import SelectToken from "../../components/common/SelectToken";
import BTC from "../../img/btc.png";
import BNB from "../../img/CAKE.png";
import ETH from "../../img/WETH.png";

const Swap = () => {
  return (
    <div>
      <InputCustom
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
