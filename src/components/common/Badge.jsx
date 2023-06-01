import React from "react"
import "./Badge.css"

const Badge = ({ text }) => {
  return <span className="text-xs mr-2 px-2 py-0.5 rounded-md badge">{text}</span>
}

export default Badge
