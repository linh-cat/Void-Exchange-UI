import React, { useState } from "react";
import "./SelectCoupleToken.css";
import BTC from "../../img/btc.png";
import downIcon from "../../img/downicon.svg";
import useOutsideDetect from "../../hooks/useOutsideDetect";
import { useMemo } from "react";

const SelectCoupleToken = ({ options, defaultValue }) => {
  const [openList, setOpenList] = useState(false);
  const [values, setValues] = useState(defaultValue);

  const toggleOpen = () => {
    setOpenList(!openList);
  };

  const onChangeValue = (value) => {
    setValues(value);
    setOpenList(false);
  };

  const handleClickOutside = () => {
    setOpenList(false);
  };

  const refOutside = useOutsideDetect(handleClickOutside);

  const renderLabel = useMemo(() => {
    const index = options.findIndex((item) => item.value === values);
    return options[index]?.label;
  }, [options, values]);

  return (
    <div className="couple-token">
      <div
        className="dd-couple-token-header flex gap-2 items-center text-white py-5 cursor-pointer"
        ref={refOutside}
        onClick={toggleOpen}
      >
        <img src={BTC} alt="btc" className="rounded-full w-7 h-7" />
        <label className="cursor-pointer text-xl label font-bold">
          {renderLabel}
        </label>
        <img
          src={downIcon}
          className={`${openList ? "rotate180" : ""} w-3`}
          alt="downicon"
        />
      </div>
      <div
        className={`${
          openList ? "open" : "close"
        } dd-couple-token-list overflow-x-auto rounded`}
      >
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Pair
              </th>
              <th scope="col" className="px-6 py-3">
                Last price
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                24h Change
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((item, idx) => (
              <tr
                className="cursor-pointer dd-couple-token-item"
                key={idx}
                onClick={() => onChangeValue(item.value)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap "
                >
                  {item.label}
                </th>
                <td className="px-6 py-4 red-down">{item.price}</td>
                <td className="px-6 py-4 green-up">{item.dayChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectCoupleToken;
