import { useEffect, useState } from "react"

const useUserWindow = () => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  })
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("resize", setDimension)

    return () => {
      window.removeEventListener("resize", setDimension)
    }
  }, [screenSize])
  return { width: screenSize.dynamicWidth, height: screenSize.dynamicHeight }
}

export default useUserWindow
