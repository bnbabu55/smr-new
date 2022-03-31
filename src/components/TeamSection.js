import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

export const TeamSection = () => {
  const { bgImages, teamMembers } = useStaticQuery(
    graphql`
      query {
        bgImages: allFile(
          filter: {
            name: { regex: "/about-slide/" }
            relativeDirectory: { eq: "background" }
          }
          sort: { fields: name, order: ASC }
        ) {
          nodes {
            name
            childImageSharp {
              gatsbyImageData(
                width: 1920
                placeholder: BLURRED
                quality: 90
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        teamMembers: allWpTeamMember {
          nodes {
            id
            title
            content
            memberRole
          }
        }
      }
    `
  )

  return (
    <>
      <div
        id="hero-banner"
        className="bg-white border-b-4 border-themeGray-50 shadow-themeShadow"
      >
        <div className="relative">
          <figure className="w-full overflow-hidden">
            <GatsbyImage
              image={bgImages.nodes[0].childImageSharp.gatsbyImageData}
              alt="About slider 1"
            />
          </figure>
          <div className="absolute text-2xl font-bold text-center title top-5 left-40 lg:top-1/4 lg:left-1/3 text-themeBlue-600 lg:text-7xl font-Montserrat">
            Industry Recognized <br />
            Team Leadership
          </div>
          <div className="absolute text-sm text-center subtitle top-2/3 right-5 lg:right-20 text-themeOrange-400 lg:text-4xl font-MontserratLight">
            Experienced & Professional Project Leaders, <br />
            Website Developers & SEO Managers
          </div>
        </div>
      </div>

      <div className="w-11/12 py-10 mx-auto">
        <div className="top_padding_page top_padding page_content_website faq-page top-space">
          <div className="wrapper">
            <div className="top_content">
              <h1 className="text-5xl font-bold tracking-wide text-center text-themeOrange-400 font-Montserrat">
                ABOUT SEARCH MARKETING RESOURCE
              </h1>
            </div>
            <div className="py-5">
              <h2 className="pb-5 text-2xl uppercase text-themeBlue-600 font-MontserratSemiBold">
                SEARCH MARKETING RESOURCE'S MISSION
              </h2>
              <p className="text-lg text-themeGray-200 font-Montserrat">
                Our team’s mission is to significantly promote our client’s web
                presence above the competition and gain a measurable increased
                level of online visibility in their vertical market. Every day,
                we work diligently to better understand the opportunities
                available for improving our customer’s websites, cultivating
                better communication with their target audience and obtaining
                top keyword rankings with the Search Engines.
              </p>
              <p className="pt-3 text-lg text-themeGray-200 font-Montserrat">
                Our goal and objective is to generate ongoing revenue growth for
                every business we represent and deliver a return on investment
                for all services provided.
              </p>
            </div>
          </div>
        </div>
        <div className="team_design light_grey_bg extra-work">
          <div className="wrapper">
            <div className="top_content team_lead">
              <h2 className="py-5 text-5xl font-bold text-left text-themeOrange-400 font-Montserrat">
                TEAM LEADERSHIP
              </h2>
              <h3 className="pb-5 text-2xl text-left uppercase text-themeBlue-600 font-MontserratSemiBold">
                MEET OUR PROJECT MANAGERS
              </h3>
              <p className="pb-10 text-lg text-themeGray-200 font-Montserrat">
                Our team leaders have significant tenure in their chosen career
                disciplines. This experience is augmented by the 100’s of
                projects each has completed while here at Search Marketing
                Resource. We actively pursue cutting-edge levels of continued
                education, much of it ‘hands on’, while achieving certification
                and accreditation specific to the technologies studied.
              </p>
            </div>
          </div>
        </div>
        <div className="about">
          {teamMembers.nodes.map(teamMember => {
            return (
              <div
                className="py-5 mdl_cont_section bgnone ab-bg"
                key={teamMember.id}
                id={teamMember.id}
              >
                <div className="conts_wrapper">
                  <div className="content_pnl">
                    <h2 className="text-2xl text-left uppercase text-themeBlue-600 font-MontserratSemiBold">
                      {teamMember.title}
                    </h2>
                    <span className="text-lg text-themeGray-200 font-Montserrat">
                      <i>{teamMember.memberRole}</i>
                    </span>
                    <div className="pt-5 text-lg text-themeGray-200 font-Montserrat">
                      {parse(teamMember.content)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default TeamSection
