import React, { useCallback, useMemo } from "react"
import Slider, { SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import "./SliderLeverage.css"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import InputCustom from "./InputCustom"
import cx from "classnames"

const { Handle } = Slider

const HEALTH_CATEGORIES = {
  SAFE: {
    label: "SAFE",
    colors: {
      LIGHT: "#16BE76"
    }
  },
  RISKY: {
    label: "RISKY",
    colors: {
      LIGHT: "#F3FF6C"
    }
  },
  DANGER: {
    label: "DANGER",
    colors: {
      LIGHT: "#E43E53"
    }
  }
}

const handleCustomTooltip = (props) => {
  const { value, dragging, index, ...restProps } = props

  const title = () => {
    if (value > 0 && value <= 20) {
      return "Safe"
    } else if (value > 20 && value <= 40) {
      return "Risky"
    } else {
      return "Danger"
    }
  }

  return (
    <SliderTooltip prefixCls="rc-slider-tooltip" overlay={title} visible={false} key={index} showArrow={false}>
      <Handle
        value={value}
        {...restProps}
        ariaLabel={title()}
        ariaValueTextFormatter={(val) => <div style={{ fontSize: "10px" }}> {val}</div>}
      />
    </SliderTooltip>
  )
}

const railStyle = {
  opacity: 0.9,
  background: `linear-gradient(to right, ${HEALTH_CATEGORIES.SAFE.colors.LIGHT}, ${HEALTH_CATEGORIES.SAFE.colors.LIGHT} 37%, ${HEALTH_CATEGORIES.RISKY.colors.LIGHT} 37%, ${HEALTH_CATEGORIES.RISKY.colors.LIGHT} 78%,  ${HEALTH_CATEGORIES.DANGER.colors.LIGHT} 78%, ${HEALTH_CATEGORIES.DANGER.colors.LIGHT})`,
  height: "5px"
}

const leverageMarks = {
  2: "2x",
  20: "20x",
  40: "40x",
  50: "50x"
}

const SliderLeverage = ({ label, tooltip, onChangeLeverage, value, onAfterChange, onBeforeChange }) => {
  const changeLeverage = useCallback(
    (val) => {
      onChangeLeverage(val)
    },
    [onChangeLeverage]
  )

  const background = useMemo(() => {
    if (value > 1 && value <= 20) {
      return "#284539"
    } else if (value > 20 && value <= 40) {
      return "#61662B"
    } else {
      return "#452C28"
    }
  }, [value])

  const color = useMemo(() => {
    if (value > 1 && value <= 20) {
      return "#16BE76"
    } else if (value > 20 && value <= 40) {
      return "#F3FF6C"
    } else {
      return "#E43E53"
    }
  }, [value])

  const width = useMemo(() => {
    return value > 40 ? "55px" : "40px"
  }, [value])
  return (
    <div className="w-full h-full slider-custom flex flex-col gap-y-5">
      <div className="flex items-center justify-between">
        <div className="title flex items-center gap-x-1">
          <label className="text-sm text-slate-500">{label}</label>
          <div className="group-tooltip">
            <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
            <div className="tooltip p-3 rounded">{tooltip}</div>
          </div>
        </div>
        <div className="w-10 h-8 text-white flex items-center justify-between gap-1 relative">
          <InputCustom
            classNameInput="p-0"
            value={value}
            onChange={changeLeverage}
            rightAction={<label className="absolute right-1 text-slate-500">x</label>}
            type="number"
            min={2}
            max={50}
          />
        </div>
      </div>

      <div className="px-5">
        <Slider
          value={value}
          min={2}
          marks={leverageMarks}
          max={50}
          handle={handleCustomTooltip}
          onAfterChange={onAfterChange}
          railStyle={railStyle}
          className="slider-custom-tooltip"
          handleStyle={{
            background: background,
            color: color,
            width: width,
            height: "20px",
            borderRadius: 5,
            marginTop: -9
          }}
          onBeforeChange={onBeforeChange}
          onChange={changeLeverage}
        />
      </div>
    </div>
  )
}

export default SliderLeverage
