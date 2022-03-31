import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

export const TestimonialSection = () => {
  const { bgImages, testimonials } = useStaticQuery(
    graphql`
      query {
        bgImages: allFile(
          filter: {
            name: { regex: "/testimonials-slide/" }
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
        testimonials: allMdx(
          filter: {
            frontmatter: {
              featuredImage: { relativeDirectory: { eq: "testimonials" } }
            }
          }
          sort: { fields: frontmatter___featuredImage___name, order: ASC }
        ) {
          nodes {
            id
            body
            frontmatter {
              title
              memberRole
              companyName
              websiteUrl
            }
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
              alt="Testimonial slider 1"
            />
          </figure>
          <div className="absolute text-2xl font-bold text-center title top-5 left-10 lg:top-1/4 lg:left-32 text-themeBlue-600 lg:text-7xl font-Montserrat">
            Hear What Our <br />
            Clients Say!
          </div>
          <div className="absolute text-sm text-center subtitle top-2/3 left-5 lg:left-32 text-themeOrange-400 lg:text-4xl font-MontserratLight">
            Best Customer Service & Highest <br />
            Client Testimonials
          </div>
        </div>
      </div>

      <div className="w-11/12 py-10 mx-auto">
        <div className="top_padding_page top_padding page_content_website faq-page top-space">
          <div className="wrapper">
            <div className="top_content">
              <h1 className="text-5xl font-bold tracking-wide text-center text-themeOrange-400 font-Montserrat">
                CUSTOMER TESTIMONIALS
              </h1>
            </div>
            <div className="py-5">
              <h2 className="pb-5 text-2xl uppercase text-themeBlue-600 font-MontserratSemiBold">
                DIGITAL MARKETING & WEBSITE DESIGN CLIENT TESTIMONIALS
              </h2>
              <p className="text-lg text-themeGray-200 font-Montserrat">
                We have provided a compilation of remarks our customers have
                submitted with regards to the various services the Search
                Marketing Resource team has provided over the years. The
                different requirements performed included Content Writing,{" "}
                <Link
                  to="/search-marketing-programs"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  SEO Programs
                </Link>
                {", "}
                optimized{" "}
                <Link
                  to="/optimized-press-release"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  Press Releases
                </Link>
                {", "}
                <Link
                  to="/email-marketing"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  Email Marketing campaigns
                </Link>
                {", "}
                <Link
                  to="/google-ads-management"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  Google Adwords management
                </Link>
                {", "}
                <Link
                  to="/social-media"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  Social Media posts
                </Link>
                {", "}
                <Link
                  to="/web-design-services"
                  className="text-lg underline text-themeGray-200 font-Montserrat"
                >
                  Website Development
                </Link>
                .... all marketing needs requested.
              </p>
            </div>
          </div>
        </div>
        <div className="py-10 about">
          {testimonials.nodes.map(testimonial => {
            return (
              <div
                className="py-5 mdl_cont_section bgnone ab-bg"
                key={testimonial.id}
                id={testimonial.id}
              >
                <h3 className="text-2xl text-left uppercase text-themeOrange-400 font-MontserratSemiBold">
                  {testimonial.frontmatter.companyName} {" - "}
                  <a
                    href={testimonial.frontmatter.websiteUrl}
                    className="text-xl lowercase text-themeBlue-600 font-Montserrat"
                  >
                    {testimonial.frontmatter.websiteUrl
                      .replace(/^\/\/|^.*?:(\/\/)?/g, "")
                      .replace(/\/$/, "")}
                  </a>
                </h3>
                <div className="py-5 text-lg text-themeGray-200 font-Montserrat">
                  <MDXRenderer className="text-lg prose text-justify">
                    {testimonial.body}
                  </MDXRenderer>
                </div>
                <h3 className="text-2xl font-bold text-left uppercase text-themeBlue-600 font-NothingYouCouldDo">
                  {testimonial.frontmatter.title}
                </h3>
                <span className="text-lg text-themeGray-200 font-Montserrat">
                  {testimonial.frontmatter.memberRole}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default TestimonialSection
