import React, { useMemo, useState } from "react";
import "./SelectToken.css";
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import useOutsideDetect from "../../hooks/useOutsideDetect";

const SelectToken = ({ options, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const onChangeValue = (token) => {
    setValue(token);
    setOpen(!open);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };
  const refOutside = useOutsideDetect(handleClickOutside);

  const renderLabel = useMemo(() => {
    const index = options?.findIndex((item) => item.value === value);
    return { label: options[index]?.label, icon: options[index]?.icon };
  }, [value, options]);

  return (
    <div className={`dd-token`}>
      <div
        className="dd-token-label border border-gray-600 rounded-full cursor-pointer gap-1 flex items-center justify-around"
        onClick={toggleOpen}
        ref={refOutside}
      >
        <img
          className="rounded-full w-7 h-7  "
          src={renderLabel?.icon}
          alt="btc"
        />
        <label className="cursor-pointer">{renderLabel?.label}</label>
        {open ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      <div className={`${open ? "open" : "close"} dd-token-list p-2 rounded`}>
        {options?.map((item, idx) => (
          <div
            className="dd-token-item flex items-center justify-between w-full p-1"
            onClick={() => onChangeValue(item.value)}
            key={idx}
          >
            <div className="flex items-center gap-2">
              <img
                className="rounded-full w-7 h-7"
                src={item?.icon}
                alt="btc"
              />
              <div className="text-sm">
                <label>{item.label}</label>
                <div className="balance">0</div>
              </div>
            </div>
            <div>
              <PlusCircleIcon className="w-5 h-5 plus" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectToken;
