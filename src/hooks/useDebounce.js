// https: gist.github.com/mudge/eb9178a4b6d595ffde8f9cb31744afcf
//
import { useState, useEffect, useRef } from "react"

const useDebounce = (callback, delay) => {
  const latestCallback = useRef()
  const [callCount, setCallCount] = useState(0)

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (callCount > 0) {
      const fire = () => {
        setCallCount(0)
        latestCallback.current()
      }

      const id = setTimeout(fire, delay)
      return () => clearTimeout(id)
    }
  }, [callCount, delay])

  return () => setCallCount((callCount) => callCount + 1)
}

export default useDebounce
