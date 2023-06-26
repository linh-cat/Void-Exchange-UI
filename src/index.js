import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import "rc-slider/assets/index.css"
import App from "./App"
import * as buffer from "buffer"
window.Buffer = buffer.Buffer

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
