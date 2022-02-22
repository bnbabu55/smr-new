import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
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
                gatsbyImageData(width: 1349, layout: FIXED, quality: 100)
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
      className="flex flex-col items-center justify-center w-full py-10 mx-auto"
    >
      {smSlides.nodes.map((smSlide, index) => {
        if (index === 0 || index % 2 === 0) {
          return (
            <div
              key={smSlide.id}
              className="w-full py-10 mx-auto flex items-center relative min-h-[289px]"
            >
              <GatsbyImage
                image={
                  smSlide.frontmatter.featuredImage.childImageSharp
                    .gatsbyImageData
                }
                alt={smSlide.frontmatter.altTxt}
                className="absolute w-full h-full z-0 bg-cover mx-auto"
              />

              <div className="py-5 lg:py-0 z-10 flex flex-col items-center justify-center lg:items-start lg:justify-start w-full px-3 lg:px-0 lg:w-10/12 mx-auto gap-y-5">
                <h3 className="text-2xl font-bold uppercase font-Raleway">
                  {smSlide.frontmatter.title}
                </h3>
                <div className="py-5 text-lg lg:w-2/3">
                  <MDXRenderer>{smSlide.body}</MDXRenderer>
                </div>
                <Link
                  to={smSlide.frontmatter.websiteUrl}
                  className="cursor-pointer"
                >
                  Read more
                </Link>
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={smSlide.id}
              className="w-full py-10 mx-auto flex items-center relative lg:min-h-[289px]"
            >
              <GatsbyImage
                image={
                  smSlide.frontmatter.featuredImage.childImageSharp
                    .gatsbyImageData
                }
                alt={smSlide.frontmatter.altTxt}
                className="absolute w-full h-full z-0 bg-cover mx-auto"
              />
              <div className="py-5 lg:py-0 z-10 flex flex-col items-center justify-center lg:items-end lg:justify-end w-full px-3 lg:px-0 lg:w-10/12 mx-auto gap-y-5">
                <h3 className="text-2xl font-bold uppercase font-Raleway">
                  {smSlide.frontmatter.title}
                </h3>
                <div className="py-5 text-lg lg:w-2/3">
                  <MDXRenderer>{smSlide.body}</MDXRenderer>
                </div>
                <Link
                  to={smSlide.frontmatter.websiteUrl}
                  className="cursor-pointer"
                >
                  Read More
                </Link>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default SMServices
