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
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 50, layout: CONSTRAINED, quality: 100)
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
              className="w-full py-10 mx-auto my-2 bg-themeYellow-400"
            >
              <div className="flex flex-col w-10/12 mx-auto gap-y-5 ">
                <h3 className="text-2xl font-bold uppercase font-Raleway">
                  {smSlide.frontmatter.title}
                </h3>
                <MDXRenderer className="py-5 text-lg">
                  {smSlide.body}
                </MDXRenderer>
                <a
                  href={smSlide.frontmatter.websiteUrl}
                  className="cursor-pointer"
                >
                  Read More
                </a>
              </div>
              {/* <GatsbyImage 
        image={
          smSlides.frontmatter.featuredImage.childImageSharp
            .gatsbyImageData
        }
        alt={smSlides.frontmatter.altTxt}
        className="w-2/5"
      /> */}
            </div>
          )
        } else {
          return (
            <div
              key={smSlide.id}
              className="w-full py-10 mx-auto my-2 bg-themeBlue-400"
            >
              {/* <GatsbyImage 
        image={
          smSlides.frontmatter.featuredImage.childImageSharp
            .gatsbyImageData
        }
        alt={smSlides.frontmatter.altTxt}
        className="w-2/5"
      /> */}

              <div className="flex flex-col items-end justify-end w-10/12 mx-auto gap-y-5">
                <h3 className="text-2xl font-bold uppercase font-Raleway">
                  {smSlide.frontmatter.title}
                </h3>
                <MDXRenderer className="py-5 text-lg">
                  {smSlide.body}
                </MDXRenderer>
                <a
                  href={smSlide.frontmatter.websiteUrl}
                  className="cursor-pointer"
                >
                  Read More
                </a>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default SMServices
