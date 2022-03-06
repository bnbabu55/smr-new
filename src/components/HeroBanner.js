import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

const HeroBanner = () => {
  const { bannerBg, bannerImg1, bannerCards } = useStaticQuery(graphql`
    query {
      bannerBg: file(
        relativePath: { regex: "/home_banner_bg.png/" }
        relativeDirectory: { regex: "/home-banner/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 1366
            placeholder: BLURRED
            quality: 100
            formats: [AVIF, WEBP, AUTO]
          )
        }
      }
      bannerImg1: file(
        relativePath: { regex: "/banner_image_1.png/" }
        relativeDirectory: { regex: "/home-banner/" }
      ) {
        id
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            quality: 100
            width: 530
            formats: [AVIF, WEBP, AUTO]
          )
        }
      }
      bannerCards: allMdx(
        filter: { fileAbsolutePath: { regex: "/home-banner/" } }
        sort: { fields: frontmatter___featuredImage___name }
      ) {
        nodes {
          id
          body
          frontmatter {
            altTxt
            title
            websiteUrl
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 70
                  layout: FIXED
                  formats: [AVIF, WEBP, AUTO]
                )
              }
            }
          }
        }
      }
    }
  `)

  const pluginImage = getImage(bannerBg)

  return (
    <BgImage
      image={pluginImage}
      id="hero-banner"
      className="flex flex-col items-start justify-center bg-cover"
    >
      <div className="flex items-center justify-between px-5 pt-20 mx-auto">
        <div className="w-[60%] text-right uppercase font-Montserrat font-bold text-white lg:text-[69px] text-3xl">
          <div className=" relative flex flex-col justify-center items-center z-[1]">
            <span className="hidden lg:block absolute z-[1] w-[150px] h-[150px] -top-[108px] -left-[5px] bg-themeYellow-400 before:content-[''] before:absolute before:w-[90px] before:h-[90px] before:top-[30px] before:left-[30px] before:bg-[#01487e] before:z-[2] after:content-[''] after:absolute after:w-[85px] after:h-[60px] after:top-[90px] after:left-[65px] after:bg-[#01487e] after:z-[3]" />
            <div className="z-10 mb-12 ml-8">Award Winning</div>
            <div className="z-10">Digital Marketing</div>
          </div>
        </div>
        <GatsbyImage
          className="w-[40%]"
          image={bannerImg1.childImageSharp.gatsbyImageData}
          alt="hero banner illustration"
        />
      </div>
      <div className="flex flex-col items-stretch justify-center w-full gap-10 px-5 mx-auto my-32 lg:w-10/12 lg:flex-row">
        {bannerCards.nodes.map(card => {
          return (
            <div
              key={card.id}
              className="w-full flex flex-col items-center justify-between gap-10 p-10 bg-[#ededed] hover:bg-themeYellow-400 relative z-20 hover:after:content-[''] hover:after:w-full hover:after:h-full hover:after:absolute hover:after:-z-20 hover:after:bg-transparent hover:after:border-2 hover:after:border-themeYellow-400 hover:after:top-3 hover:after:left-3 group"
            >
              <div className="flex items-center justify-between gap-x-4">
                <GatsbyImage
                  image={
                    card.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData
                  }
                  alt={card.frontmatter.altTxt}
                  className="w-2/5"
                />
                <h3 className="w-3/5 text-22 px-2 font-semibold font-Montserrat">
                  {card.frontmatter.title}
                </h3>
              </div>
              <div className="py-5 text-sm leading-7">
                <MDXRenderer>{card.body}</MDXRenderer>
              </div>
              <Link
                to={card.frontmatter.websiteUrl}
                className="mt-auto cursor-pointer text-left w-full text-sm font-semibold flex justify-between items-center"
              >
                Get More Info
                <span className="text-2xl group-hover:rotate-180 group-hover:duration-500 group-hover:ease-in-out">
                  &#10230;
                </span>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-4 gap-5 px-5 mx-auto lg:grid-cols-4 lg:grid-rows-2 lg:w-10/12">
        <div className="col-span-2 row-span-2">
          <h3 className="text-22 font-semibold uppercase font-Montserrat">
            Digital Marketing Services
          </h3>
          <p className="py-5 text-sm font-Montserrat leading-7">
            Award winning search optimized website development services,
            professionaly designed with industry leading graphics, and
            functionality. Our site presentations focus on your target audience
            and corporate brand while promoting your products and services.
          </p>
          <ul className="grid grid-cols-2 gap-5 pt-5 text-sm list-none list-inside font-Montserrat">
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
            <li>
              <span className="pr-2">✓</span>Mockup Design Review
            </li>
          </ul>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-22 font-semibold uppercase font-Montserrat">
            Digital Marketing
          </h3>
          <p className="py-5 text-sm leading-7 font-Montserrat">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-22 font-semibold uppercase font-Montserrat">
            Digital Marketing
          </h3>
          <p className="py-5 text-sm leading-7 font-Montserrat">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-22 font-semibold uppercase font-Montserrat">
            Digital Marketing
          </h3>
          <p className="py-5 text-sm leading-7 font-Montserrat">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-22 font-semibold uppercase font-Montserrat">
            Digital Marketing
          </h3>
          <p className="py-5 text-sm leading-7 font-Montserrat">
            Award winning search optimized website development services.
          </p>
        </div>
      </div>
    </BgImage>
  )
}

export default HeroBanner
