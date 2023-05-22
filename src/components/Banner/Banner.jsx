import React from "react"
import "./Banner.css"
import { Link } from "react-router-dom"

const Banner = () => {
  return (
    <section className="banner-db animation-container">
      {/* <div class="lightning-container">
    <div class="lightning white"></div>
    <div class="lightning blu"></div>
  </div> */}
      <div className="boom-container">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape triangle big yellow"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container second">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container third">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="banner-container">
        <h1 className="text-5xl font-bold">Long or Short Assets</h1>
        <p className="py-3 md:py-8">Void Exchange is a perpetual futures dex for assets</p>
        <div>
          <Link className="trade-now py-3 px-5 rounded-lg font-medium" to="/trade">
            Trade Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Banner
