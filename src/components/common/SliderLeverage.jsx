import React, { useMemo, useRef, useState } from "react"
import Slider, { SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import "./SliderLeverage.css"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"

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

  const color = () => {
    if (value > 0 && value <= 20) {
      return "#16BE76"
    } else if (value > 20 && value <= 40) {
      return "#F3FF6C"
    } else {
      return "#E43E53"
    }
  }

  const background = () => {
    if (value > 0 && value <= 20) {
      return "#284539"
    } else if (value > 20 && value <= 40) {
      return "#61662B"
    } else {
      return "#452C28"
    }
  }

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
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={title}
      visible={false}
      key={index}
      showArrow={false}
      // overlayStyle={{
      //   background: background(),
      //   padding: "5px 10px",
      //   borderRadius: "5px",
      //   fontWeight: "500",
      //   letterSpacing: "1px",
      //   cursor: "pointer",
      //   fontSize: "10px"
      // }}
      // overlayInnerStyle={{
      //   background: "none",
      //   boxShadow: "unset",
      //   padding: 0,
      //   height: "100%",
      //   borderRadius: 0,
      //   color: color()
      // }}
    >
      <Handle value={value} {...restProps} />
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

const SliderLeverage = ({ label, tooltip, defaultValue }) => {
  const [value, setValue] = useState(defaultValue)
  const onAfterChage = (amount) => {
    setValue(amount)
  }

  const onChange = (amount) => {
    setValue(amount)
  }

  const onBeforeChange = (amount) => {
    console.log({ amount })
  }

  const title = useMemo(() => {
    if (value > 0 && value <= 20) {
      return "Safe"
    } else if (value > 20 && value <= 40) {
      return "Risky"
    } else {
      return "Danger"
    }
  }, [value])

  const background = useMemo(() => {
    if (value > 0 && value <= 20) {
      return "#284539"
    } else if (value > 20 && value <= 40) {
      return "#61662B"
    } else {
      return "#452C28"
    }
  }, [value])

  const color = useMemo(() => {
    if (value > 0 && value <= 20) {
      return "#16BE76"
    } else if (value > 20 && value <= 40) {
      return "#F3FF6C"
    } else {
      return "#E43E53"
    }
  }, [value])

  const width = useMemo(() => {
    return value > 40 ? "65px" : "55px"
  }, [value])

  return (
    <div className="w-full h-full slider-custom flex flex-col gap-y-5">
      <div className="title flex items-center gap-x-1">
        <label className="text-sm">{label}</label>
        <div className="group-tooltip">
          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
          <div className="tooltip p-3 rounded">{tooltip}</div>
        </div>
      </div>
      <Slider
        defaultValue={value}
        min={2}
        marks={leverageMarks}
        max={50}
        handle={handleCustomTooltip}
        onAfterChange={onAfterChage}
        railStyle={railStyle}
        key={value}
        className="slider-custom-tooltip"
        handleStyle={{
          background: background,
          color: color,
          width: width,
          height: "24px",
          borderRadius: 5,
          marginTop: -10
        }}
        // onBeforeChange={onBeforeChange}
        // onChange={onChange}
        ariaLabelForHandle={title}
      />
    </div>
  )
}

export default SliderLeverage
