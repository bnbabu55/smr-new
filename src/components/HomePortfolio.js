import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"

const HomePortfolio = () => {
  const { portfolioImages } = useStaticQuery(graphql`
    query {
      portfolioImages: allFile(
        filter: {
          name: { regex: "/icon/" }
          relativeDirectory: { eq: "home-portfolios" }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 275
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
    <div id="HomePortfolio" className="mx-auto text-gray-800 bg-white lg:py-16">
      <div className="w-10/12 mx-auto">
        <div className="w-full">
          <div className="flex items-center justify-center pb-8 text-center">
            <Link
              to={`/portfolio`}
              className="text-4xl font-semibold uppercase font-Montserrat hover:underline"
            >
              Portfolio
            </Link>
          </div>
          <p className="w-4/5 mx-auto text-sm text-center font-Montserrat">
            The Search Marketing Resource team has provided website graphic
            design services and online marketing solutions for thousands of
            businesses nationwide, and in every major vertical market including
            business-to-business, industrial, consumer based and retail based
            companies.
          </p>
          <div className="grid items-center grid-cols-2 grid-rows-4 pt-10 lg:mt-5 lg:grid-cols-4 lg:grid-rows-2">
            <Link
              to={`/portfolio`}
              className="col-start-1 col-end-2 row-start-1 row-end-2 p-5 border-b border-r border-gray-500"
              aria-label={portfolioImages.nodes[0].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[0].name}
                image={portfolioImages.nodes[0].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-2 col-end-3 row-start-1 row-end-2 p-5 border-b border-gray-500 lg:border-r"
              aria-label={portfolioImages.nodes[1].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[1].name}
                image={portfolioImages.nodes[1].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-1 col-end-2 row-start-2 row-end-3 p-5 border-b border-r border-gray-500 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2"
              aria-label={portfolioImages.nodes[2].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[2].name}
                image={portfolioImages.nodes[2].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-2 col-end-3 row-start-2 row-end-3 p-5 border-b border-gray-500 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2"
              aria-label={portfolioImages.nodes[3].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[3].name}
                image={portfolioImages.nodes[3].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-1 col-end-2 row-start-3 row-end-4 p-5 border-b border-r border-gray-500 lg:border-b-0 lg:row-start-2 lg:row-end-3"
              aria-label={portfolioImages.nodes[4].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[4].name}
                image={portfolioImages.nodes[4].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-2 col-end-3 row-start-3 row-end-4 p-5 border-b border-gray-500 lg:border-b-0 lg:border-r lg:row-start-2 lg:row-end-3"
              aria-label={portfolioImages.nodes[5].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[5].name}
                image={portfolioImages.nodes[5].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-1 col-end-2 row-start-4 row-end-5 p-5 border-r border-gray-500 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3"
              aria-label={portfolioImages.nodes[6].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[6].name}
                image={portfolioImages.nodes[6].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
            <Link
              to={`/portfolio`}
              className="col-start-2 col-end-3 row-start-4 row-end-5 lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3"
              aria-label={portfolioImages.nodes[7].name}
            >
              <GatsbyImage
                alt={portfolioImages.nodes[7].name}
                image={portfolioImages.nodes[7].childImageSharp.gatsbyImageData}
                className="hover:scale-125 duration-300 ease-in-out"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePortfolio
