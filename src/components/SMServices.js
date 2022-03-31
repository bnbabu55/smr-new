import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { MDXRenderer } from "gatsby-plugin-mdx"

const SMServices = () => {
  const { smSlides } = useStaticQuery(graphql`
    query {
      smSlides: allMdx(
        filter: { fileAbsolutePath: { regex: "/smservices/" } }
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
                  width: 2000
                  placeholder: BLURRED
                  quality: 100
                  formats: [AUTO]
                )
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div
      id="sm-services"
      className="flex flex-col items-center justify-center w-full py-10 mx-auto gap-y-4"
    >
      {smSlides.nodes.map((smSlide, index) => {
        const pluginImage = getImage(smSlide.frontmatter.featuredImage)

        if (index === 0 || index % 2 === 0) {
          return (
            <BgImage
              image={pluginImage}
              key={smSlide.id}
              className="flex items-center w-full py-10 mx-auto bg-scroll bg-cover"
            >
              <div className="flex flex-col items-center justify-center w-full px-3 py-5 mx-auto lg:py-0 lg:items-start lg:justify-start lg:px-0 lg:w-10/12 gap-y-5">
                <h3 className="font-bold uppercase text-22 font-Montserrat">
                  {smSlide.frontmatter.title}
                </h3>
                <div className="py-5 text-sm leading-7 lg:w-2/3">
                  <MDXRenderer>{smSlide.body}</MDXRenderer>
                </div>
                <Link
                  to={smSlide.frontmatter.websiteUrl}
                  className="text-sm font-semibold underline cursor-pointer"
                >
                  Read more about our {smSlide.frontmatter.title} offerings
                </Link>
              </div>
            </BgImage>
          )
        } else {
          return (
            <BgImage
              image={pluginImage}
              key={smSlide.id}
              className="flex items-center w-full py-10 mx-auto"
            >
              <div className="flex flex-col items-center justify-center w-full px-3 py-5 mx-auto lg:py-0 lg:items-end lg:justify-end lg:px-0 lg:w-10/12 gap-y-5">
                <h3 className="font-bold uppercase text-22 font-Montserrat">
                  {smSlide.frontmatter.title}
                </h3>
                <div className="py-5 text-sm leading-7 lg:w-2/3">
                  <MDXRenderer>{smSlide.body}</MDXRenderer>
                </div>
                <Link
                  to={smSlide.frontmatter.websiteUrl}
                  className="text-sm font-semibold underline cursor-pointer"
                >
                  Read more about our {smSlide.frontmatter.title} offerings
                </Link>
              </div>
            </BgImage>
          )
        }
      })}
    </div>
  )
}

export default SMServices
