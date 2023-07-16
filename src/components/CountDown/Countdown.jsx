import React, { useEffect, useState } from "react"

const Countdown = ({ time = "2023-07-16T00:00:00Z", className }) => {
  const targetDate = new Date(time) // Replace with your target date
  const [remainingTime, setRemainingTime] = useState()

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const calculateTimeRemaining = () => {
    const currentTime = new Date()
    const timeDifference = targetDate - currentTime

    if (timeDifference < 0) {
      // Countdown has reached the target date
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    const totalSeconds = Math.floor(timeDifference / 1000)
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24)
    const minutes = Math.floor((totalSeconds / 60) % 60)
    const seconds = Math.floor(totalSeconds % 60)

    return {
      hours,
      minutes,
      seconds
    }
  }

  return (
    <div className={className}>
      {remainingTime?.hours}:{remainingTime?.minutes}:{remainingTime?.seconds}
    </div>
  )
}

export default Countdown
