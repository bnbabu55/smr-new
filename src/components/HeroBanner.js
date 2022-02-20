import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import { MDXRenderer } from "gatsby-plugin-mdx"

const HeroBanner = () => {
  const { bannerImg1, bannerCards } = useStaticQuery(graphql`
    query {
      bannerImg1: file(
        relativePath: { regex: "/banner_image_1.png/" }
        relativeDirectory: { regex: "/home-banner/" }
      ) {
        id
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            quality: 100
            width: 603
            formats: [AVIF, WEBP, PNG, JPG]
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
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 70, layout: FIXED)
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div
      id="hero-banner"
      className="bg-no-repeat bg-cover bg-center min-h-[1297px] flex flex-col justify-center items-start relative"
    >
      <StaticImage
        alt=""
        src="../../content/assets/home-banner/banner_bg.png"
        className="absolute top-0 w-full h-full -z-1"
      />
      <div className="z-10 flex items-center justify-between px-5 pt-20 mx-auto">
        <div className="w-[55%] text-right uppercase font-Raleway font-black text-white lg:text-6xl text-3xl">
          <div className=" relative flex flex-col justify-center items-center z-[1]">
            <span className="hidden lg:block absolute z-[1] w-[150px] h-[150px] -top-[100px] -left-[5px] bg-themeYellow-400 before:content-[''] before:absolute before:w-[90px] before:h-[90px] before:top-[30px] before:left-[30px] before:bg-[#01487e] before:z-[2] after:content-[''] after:absolute after:w-[85px] after:h-[60px] after:top-[90px] after:left-[65px] after:bg-[#01487e] after:z-[3]" />
            <div className="z-10">Award Winning</div>
            <div className="z-10">Digital Marketing</div>
          </div>
        </div>
        <GatsbyImage
          className="w-[45%]"
          image={bannerImg1.childImageSharp.gatsbyImageData}
          alt="hero banner illustration"
        />
      </div>
      <button className="font-Raleway fixed z-[99] right-0 origin-bottom-right px-5 py-2 font-bold -rotate-90 rounded-tl rounded-tr top-40 bg-themeYellow-400">
        Quick Quote
      </button>
      <div className="z-50 flex flex-col items-stretch justify-center w-full gap-10 px-5 mx-auto my-32 lg:w-10/12 lg:flex-row">
        {bannerCards.nodes.map(card => {
          return (
            <div
              key={card.id}
              className="flex flex-col items-center justify-between gap-10 p-10 bg-[#ededed] hover:bg-themeYellow-400 relative hover:after:content-[''] hover:after:w-full hover:after:h-full hover:after:absolute hover:after:bg-transparent hover:after:border-2 hover:after:border-themeYellow-400 hover:after:top-3 hover:after:left-3"
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
                <h3 className="w-3/5 text-xl font-semibold font-Raleway">
                  {card.frontmatter.title}
                </h3>
              </div>
              <MDXRenderer className="py-5 text-lg">{card.body}</MDXRenderer>
              <a
                href={card.frontmatter.websiteUrl}
                className="mt-auto cursor-pointer"
              >
                Learn more
              </a>
            </div>
          )
        })}
      </div>
      <div className="z-50 grid w-full grid-cols-2 grid-rows-4 gap-5 px-5 mx-auto lg:grid-cols-4 lg:grid-rows-2 lg:w-10/12">
        <div className="col-span-2 row-span-2">
          <h3 className="text-2xl font-bold uppercase font-Raleway">
            Digital Marketing Services
          </h3>
          <p className="py-5 text-base font-Lusitana">
            Award winning search optimized website development services,
            professionaly designed with industry leading graphics, and
            functionality. Our site presentations focus on your target audience
            and corporate brand while promoting your products and services.
          </p>
          <ul className="grid grid-cols-2 gap-5 pt-5 text-sm list-inside list-tick font-Raleway">
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
            <li>Mockup Design Review</li>
          </ul>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-2xl font-bold uppercase font-Raleway">
            Digital Marketing
          </h3>
          <p className="py-5 text-base font-Lusitana">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-2xl font-bold uppercase font-Raleway">
            Digital Marketing
          </h3>
          <p className="py-5 text-base font-Lusitana">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-2xl font-bold uppercase font-Raleway">
            Digital Marketing
          </h3>
          <p className="py-5 text-base font-Lusitana">
            Award winning search optimized website development services.
          </p>
        </div>
        <div className="col-span-1 row-span-1 p-5 text-white bg-themeBlue-400">
          <h3 className="text-2xl font-bold uppercase font-Raleway">
            Digital Marketing
          </h3>
          <p className="py-5 text-base font-Lusitana">
            Award winning search optimized website development services.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
