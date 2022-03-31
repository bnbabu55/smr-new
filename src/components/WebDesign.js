import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"

const WebDesign = () => {
  const { wdIcons, wdSlides } = useStaticQuery(graphql`
    query {
      wdIcons: allFile(
        filter: {
          name: { regex: "/check-mark-box-orange/" }
          relativeDirectory: { eq: "webdesign" }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 20
              height: 20
              layout: FIXED
              placeholder: BLURRED
              quality: 90
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      wdSlides: allFile(
        filter: {
          name: { regex: "/website-design-services-home-collage/" }
          relativeDirectory: { eq: "webdesign" }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 540
              placeholder: BLURRED
              quality: 90
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `)

  return (
    <div
      id="web-design"
      className="flex flex-col pt-5 pb-10 border-b border-gray-300 lg:flex-row justify-evenly"
    >
      <div className="w-full p-5 lg:w-5/12">
        <figure className="overflow-hidden">
          <GatsbyImage
            image={wdSlides.nodes[0].childImageSharp.gatsbyImageData}
            alt="Website Design and Development Services Company"
            width="540"
            data-image={wdSlides.nodes[0].childImageSharp.gatsbyImageData}
          />
        </figure>
      </div>
      <div className="w-full mx-auto wrapper lg:w-6/12">
        <div className="flex flex-col items-center justify-center text-center top_content">
          <h3 className="py-5">
            <Link
              to={`/web-design-services`}
              className="text-3xl font-semibold uppercase text-themeBlue-600 font-Montserrat"
            >
              Web Design Services
            </Link>
          </h3>
          <p className="pb-10 text-lg text-center text-themeGray-200 font-Montserrat">
            Award winning search optimized website development services,
            professionally designed with industry leading graphics and
            functionality. Our site presentations focus on your target audience
            and corporate brand while promoting your products and services.
          </p>
        </div>
        <div className="flex flex-col pl-5 lg:flex-row justify-evenly lg:pl-0">
          <ul>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Mock Up Design Review</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Page Copy Writing</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Infographics Design</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">SSL Secure Forms</span>
            </li>
          </ul>
          <ul>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Dynamic Graphic Design</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">HTML5 Project Coding</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Mobile Friendly Themes</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Parallax Design Effects</span>
            </li>
          </ul>
          <ul>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Ecommerce Solutions</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Content Management</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">Database Engineering</span>
            </li>
            <li className="flex items-center pb-3 text-lg font-Montserrat text-themeBlue-600">
              <GatsbyImage
                image={wdIcons.nodes[0].childImageSharp.gatsbyImageData}
                alt="checkmark icon"
                width="20"
              />
              <span className="pl-2">SEO Optimized Content</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WebDesign
