import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

export const SocialMedia = () => {
  const { bgImages, socialItems } = useStaticQuery(
    graphql`
      query {
        bgImages: allFile(
          filter: {
            name: { regex: "/social-media-management-info/" }
            relativeDirectory: { eq: "social-media" }
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
        socialItems: allMdx(
          filter: { fileAbsolutePath: { regex: "/social-media/" } }
          sort: { fields: frontmatter___featuredImage___name, order: ASC }
        ) {
          nodes {
            id
            body
            frontmatter {
              title
            }
          }
        }
      }
    `
  )

  return (
    <>
      <div>
        <figure className="w-full overflow-hidden">
          <GatsbyImage
            image={bgImages.nodes[0].childImageSharp.gatsbyImageData}
            alt="Social Media Info"
          />
        </figure>
      </div>
      <div className="about">
        {socialItems.nodes.map((socialItem, i) => {
          return (
            <div
              className={`mb-5 py-5 ${
                i % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
              key={socialItem.id}
              id={socialItem.id}
            >
              <div className="">
                <div
                  className={`font-Montserrat text-left ${
                    i % 2 === 0 ? "text-themeBlue-600" : "text-themeOrange-400"
                  }`}
                >
                  <h2 className="text-3xl font-bold ">
                    {socialItem.frontmatter.title}
                  </h2>
                  <MDXRenderer className="py-5 text-lg">
                    {socialItem.body}
                  </MDXRenderer>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SocialMedia
