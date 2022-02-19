import React from "react"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

const Statistics = () => {
  return (
    <div id="statistics" className="py-16 mx-auto overflow-hidden bg-white">
      <div className="container flex flex-col items-center justify-between w-full gap-5 mx-auto text-center lg:flex-row lg:w-10/12 lg:px-10">
        <p className="text-5xl font-black">
          {/* <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div style={{ height: 50 }}>
                {isVisible ? <CountUp start={0} end={32} /> : "32"} */}
          <CountUp start={0} end={32} delay={5} />{" "}
          <span className="text-[#e55327]">+</span>
          {/* </div>
            )}
          </VisibilitySensor> */}
          <br />
          <span className="text-base font-normal">professionals team</span>
        </p>
        <p className="text-5xl font-black">
          248<span className="text-[#e55327]">+</span>
          <br />
          <span className="text-base font-normal">satisfied customers</span>
        </p>
        <p className="text-5xl font-black">
          <CountUp start={0} end={917} delay={5} />{" "}
          <span className="text-[#e55327]">+</span>
          <br />
          <span className="text-base font-normal">successful projects</span>
        </p>
        <p className="text-5xl font-black">
          10<span className="text-[#e55327]">+</span>
          <br />
          <span className="text-base font-normal">years of experience</span>
        </p>
      </div>
    </div>
  )
}

export default Statistics
