import React, { useState, useEffect } from "react"
import "./LoadingLine.css"

const LoadingLine = () => {
  const [loadingWidth, setLoadingWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingWidth((prevWidth) => prevWidth + 10)
    }, 500)

    if (loadingWidth === 100) {
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [loadingWidth])

  return (
    <div>
      <div
        style={{
          width: `${loadingWidth}%`,
          transition: "width 0.5s ease"
        }}
        className="bg-green rounded h-1"
      />
    </div>
  )
}

export default LoadingLine
