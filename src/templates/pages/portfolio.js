import React, { useState } from "react"
import { graphql } from "gatsby"
import FreeQuoteSection from "../../components/FreeQuoteSection"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import ContactSection from "../../components/ContactSection"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import SwiperCore, { Pagination, Navigation, Grid } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "../../styles/swiper-pagination.css"

SwiperCore.use([Pagination, Navigation, Grid])

const PortfolioPage = ({
  data: { page, bgImage, defaultImage, clients },
  location,
}) => {
  const pluginImage = getImage(bgImage.childImageSharp.gatsbyImageData)
  const image = convertToBgImage(pluginImage)

  const [clientList, setClientList] = useState(clients?.nodes)

  function handleClick(e) {
    let currentIndustry = e.target.dataset.id
    let filteredClients = []
    if (currentIndustry.toLowerCase() === "all") {
      filteredClients = clients?.nodes
    } else {
      filteredClients = clients?.nodes.filter(y =>
        y.portfolioDetails.industry.some(
          x => x.name.toLowerCase() === currentIndustry.toLowerCase()
        )
      )
    }
    setClientList(filteredClients)
    console.log(currentIndustry + " # of clients " + filteredClients.length)
  }

  return (
    <Layout location={location}>
      <Seo seoData={page?.seo} />
      <BackgroundImage
        Tag="section"
        // Spread bgImage into BackgroundImage:
        {...image}
        preserveStackingContext
        id="WebDesignPage"
        className="w-full text-gray-800 font-MontserratBlack py-20 border-b-4 border-themeGray-50 shadow-themeShadow mb-8"
      >
        <div className="pl-24 lg:pl-96 flex flex-col gap-y-10">
          <div className="text-themeBlue-600 mt-20 text-2xl lg:text-7xl font-Montserrat font-bold text-center">
            Nationwide Services <br />
            All Industries &amp; Markets
          </div>
          <div className="text-themeOrange-400 text-sm lg:text-4xl font-MontserratLight text-center">
            We Provide Solutions To Consumer, B2B, <br />
            Ecommerce, &amp; Industrial Businesses
          </div>
        </div>
      </BackgroundImage>
      <div className="w-11/12 mx-auto">
        <h1 className="text-themeOrange-400 text-5xl font-Montserrat font-bold tracking-wide text-center pb-5">
          RECENT WEBSITE DESIGN &amp; SEO PROGRAMS
        </h1>
        <p className="text-themeGray-200 text-lg font-Montserrat pb-3">
          Search Marketing Resource has provided 1,000???s of SEO programs and
          website design projects for companies in every major vertical industry
          including financial, education, retail, industrial and business
          services across the nation.
        </p>
        <p className="text-lg pb-3">
          The varying skill-sets, experience and project leadership of the team
          delivers all requirements on time, in scope, within budget and with
          class leading results. The clients presented provide an example of the
          graphic design capabilities and inbound marketing technologies our
          team completes every day.
        </p>
      </div>
      <div className="py-8">
        <div className="lg:h-12 bg-themeBlue-600">
          <ul className="w-10/12 mx-auto flex flex-col lg:flex-row uppercase justify-evenly items-center">
            <li>
              <button
                className="w-[164px] bg-themeOrange-400 p-4 my-2 lg:mb-0 lg:-mt-2 border-2 border-themeGray-50 text-white text-center"
                data-id="all"
                onClick={handleClick}
              >
                All
              </button>
            </li>
            <li>
              <button
                className="w-[164px] bg-themeOrange-400 p-4 my-2 lg:mb-0 lg:-mt-2 border-2 border-themeGray-50 text-white text-center"
                data-id="financial"
                onClick={handleClick}
              >
                Financial
              </button>
            </li>
            <li>
              <button
                className="w-[164px] bg-themeOrange-400 p-4 my-2 lg:mb-0 lg:-mt-2 border-2 border-themeGray-50 text-white text-center"
                data-id="industrial"
                onClick={handleClick}
              >
                Industrial
              </button>
            </li>
            <li>
              <button
                className="w-[164px] bg-themeOrange-400 p-4 my-2 lg:mb-0 lg:-mt-2 border-2 border-themeGray-50 text-white text-center"
                data-id="business"
                onClick={handleClick}
              >
                Business
              </button>
            </li>
            <li>
              <button
                className="w-[164px] bg-themeOrange-400 p-4 my-2 lg:mb-0 lg:-mt-2 border-2 border-themeGray-50 text-white text-center"
                data-id="consumer"
                onClick={handleClick}
              >
                Consumer
              </button>
            </li>
          </ul>
        </div>
        <div className="py-10">
          {/* <ul className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-x-3 justify-evenly items-center text-base font-Montserrat"> */}
          <Swiper
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 5,
                grid: {
                  fill: "row",
                  rows: 5,
                },
              },
            }}
            className="w-11/12 mx-auto"
          >
            {clientList.map(client => {
              let regEx = /\/services\//g
              let serviceList = client.portfolioDetails.services
                .filter(y => y.uri.match(regEx))
                .map(x => x.name)
                .join(", ")
              let regEx1 = /\/industry\//g
              let industryList = client.portfolioDetails.industry
                .filter(y => y.uri.match(regEx1))
                .map(x => x.name)
                .join(", ")

              return (
                <SwiperSlide
                  key={client.id}
                  className="flex flex-col lg:flex-row lg:gap-x-3 items-center lg:items-end py-5"
                >
                  <GatsbyImage
                    image={
                      client.featuredImage.node.localFile.childImageSharp
                        .gatsbyImageData
                        ? client.featuredImage.node.localFile.childImageSharp
                            .gatsbyImageData
                        : defaultImage.childImageSharp?.gatsbyImageData
                    }
                    width="280"
                    height="265"
                    alt={
                      client.featuredImage.node.altTxt
                        ? client.featuredImage.node.altTxt
                        : ""
                    }
                    className="border-4 border-themeOrange-400"
                  />
                  <ul className="flex flex-col text-themeBlue-600 text-sm break-all pt-3">
                    <li className="uppercase">
                      <span className="pr-3 uppercase text-themeGray-200">
                        Project:
                      </span>
                      <span className="font-Montserrat font-bold">
                        {client?.title}
                      </span>
                    </li>
                    <li>
                      <span className="pr-3 uppercase text-themeGray-200">
                        Website:
                      </span>
                      {client?.portfolioDetails?.website}
                    </li>
                    <li>
                      <span className="pr-3 uppercase text-themeGray-200">
                        Services:
                      </span>
                      {serviceList}
                    </li>
                    <li>
                      <span className="pr-2 uppercase text-themeGray-200">
                        Industry:
                      </span>
                      {industryList}
                    </li>
                    <li>
                      <span className="pr-2 uppercase text-themeGray-200">
                        Location:
                      </span>
                      {client?.portfolioDetails?.location}
                    </li>
                  </ul>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
      <FreeQuoteSection />
      <ContactSection />
    </Layout>
  )
}

export default PortfolioPage

export const pageQuery = graphql`
  query PortfolioPageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      slug
      seo {
        fullHead
        schema {
          raw
        }
      }
    }
    bgImage: file(
      name: { regex: "/portfolio-banner-image/" }
      relativeDirectory: { eq: "background" }
    ) {
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
    defaultImage: file(name: { regex: "/default-featured-image/" }) {
      name
      childImageSharp {
        gatsbyImageData(
          width: 280
          height: 265
          layout: FIXED
          placeholder: BLURRED
          quality: 90
          formats: [AUTO, WEBP]
        )
      }
    }
    clients: allWpPortfolio(limit: 100) {
      nodes {
        id
        title
        slug
        portfolioDetails {
          website
          services {
            name
            uri
          }
          industry {
            name
            uri
          }
          location
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 280
                  height: 265
                  layout: FIXED
                  placeholder: BLURRED
                  quality: 90
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`
