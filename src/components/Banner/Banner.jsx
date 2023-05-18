import React from "react"
import "./Banner.css"

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
          <a className="trade-now py-3 px-5 rounded-lg font-medium" href="/trade">
            Trade Now
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
