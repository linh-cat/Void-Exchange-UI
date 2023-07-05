import React, { useEffect } from "react"
import cx from "classnames"
import "./LoadingLine.css"

const LoadingLine = ({ loadingWidth, setLoadingWidth }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingWidth((prevWidth) => prevWidth + 3)
    }, 250)

    if (loadingWidth > 100) {
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [loadingWidth, setLoadingWidth])

  return (
    <div>
      <div
        style={{
          width: `${loadingWidth}%`,
          transition: "all 0.5s ease-in-out"
        }}
        className={cx("rounded h-1", { "bg-green": loadingWidth >= 100, "bg-yellow": loadingWidth < 100 })}
      />
    </div>
  )
}

export default LoadingLine
