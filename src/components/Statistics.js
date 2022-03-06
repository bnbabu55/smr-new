import React from "react"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

const Statistics = () => {
  const { bannerBg } = useStaticQuery(graphql`
    query {
      bannerBg: file(relativePath: { regex: "/statistic_text_bg.png/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 2000
            placeholder: BLURRED
            quality: 100
            formats: [AUTO]
          )
        }
      }
    }
  `)

  const pluginImage = getImage(bannerBg)

  return (
    <BgImage
      image={pluginImage}
      id="statistics"
      className="flex items-center py-32 mx-auto"
    >
      <div className="flex flex-col items-center w-full gap-5 mx-auto text-center justify-evenly lg:flex-row lg:w-10/12">
        <div className="text-5xl font-semibold">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={32} /> : "32"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-sm font-normal font-Montserrat">
            Professionals team
          </span>
        </div>
        <div className="text-5xl font-semibold">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={248} /> : "248"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-sm font-normal font-Montserrat">
            Satisfied customers
          </span>
        </div>
        <div className="text-5xl font-semibold">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={917} /> : "917"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-sm font-normal font-Montserrat">
            Successful projects
          </span>
        </div>
        <div className="text-5xl font-semibold">
          <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
            {({ isVisible }) => (
              <div>
                {isVisible ? <CountUp start={0} end={10} /> : "10"}
                <span className="text-[#e55327]">+</span>
              </div>
            )}
          </VisibilitySensor>
          <br />
          <span className="text-sm font-normal font-Montserrat">
            Years of experience
          </span>
        </div>
      </div>
    </BgImage>
  )
}

export default Statistics
