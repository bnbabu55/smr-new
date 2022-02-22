import React from "react"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import { StaticImage } from "gatsby-plugin-image"

const Statistics = () => {
  return (
    <div
      id="statistics"
      className="w-full relative py-32 mx-auto overflow-hidden bg-white flex items-center"
    >
      <StaticImage
        src="../../content/assets/statistic_text_bg.png"
        alt=""
        className="absolute w-full h-full z-0 bg-cover mx-auto"
      />
      <div className="z-10 flex flex-col items-center justify-evenly w-full gap-5 mx-auto text-center lg:flex-row lg:w-10/12">
        <div className="text-5xl font-black">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={32} /> : "32"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-base font-normal font-Raleway">
            professionals team
          </span>
        </div>
        <div className="text-5xl font-black">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={248} /> : "32"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-base font-normal font-Raleway">
            satisfied customers
          </span>
        </div>
        <div className="text-5xl font-black">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={917} /> : "32"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-base font-normal font-Raleway">
            successful projects
          </span>
        </div>
        <div className="text-5xl font-black">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={10} /> : "32"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-base font-normal font-Raleway">
            years of experience
          </span>
        </div>
      </div>
    </div>
  )
}

export default Statistics
