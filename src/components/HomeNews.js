import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse, { domToReact } from "html-react-parser"

const HomeNews = () => {
  const { homeNews } = useStaticQuery(graphql`
    query HomeRecentNews {
      homeNews: allWpPost(sort: { fields: [date], order: DESC }, limit: 3) {
        nodes {
          id
          excerpt
          uri
          date(formatString: "MMMM DD, YYYY")
          day: date(formatString: "DD/MMM")
          title
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    width: 359
                    height: 240
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
          }
        }
      }
    }
  `)

  if (!homeNews?.nodes || homeNews.nodes === 0) return null

  const options = {
    replace: domNode => {
      if (!domNode.attribs) {
        return
      }

      if (domNode.name === "p" && domNode.attribs.class !== "read-more") {
        return (
          <p
            itemProp="description"
            className="mt-2 text-sm leading-7 text-justify font-Montserrat line-clamp-3"
          >
            {domToReact(domNode.children, options)}
          </p>
        )
      }

      if (domNode.attribs.class === "more-link") {
        return <></>
      }
    },
  }

  return (
    <div id="HomeNews" className="py-10 mx-auto bg-[#f4f5f9] home-news">
      <div className="w-10/12 py-5 mx-auto text-center">
        <div className="mx-auto mb-5 text-center">
          <h2 className="pb-8">
            <Link
              to="/news"
              className="text-4xl font-semibold uppercase font-Montserrat hover:underline"
            >
              Latest from the Blog
            </Link>
          </h2>

          <p className="pb-8 text-sm leading-7 text-center font-Montserrat">
            Stay Current on Search Marketing Resource events, industry news,
            recent projects, the latest design practices and online marketing
            advice <br /> - Opt In on our News Page and receive posts alerts to
            your email
          </p>
        </div>
        <ul className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-5">
          {homeNews.nodes.map((post, i) => {
            const featuredImage = {
              fluid:
                post.featuredImage?.node?.localFile?.childImageSharp
                  ?.gatsbyImageData,
              alt: post.featuredImage?.node?.altText || ``,
            }
            const title = post?.title
            return (
              <li key={post.id} className="flex w-full">
                <ul className="flex flex-col gap-3 overflow-hidden bg-white shadow-xl rounded-3xl group">
                  <li className="flex items-start justify-start mb-3">
                    <Link
                      to={`${post?.uri}`}
                      itemProp="url"
                      className="w-full"
                      aria-label={featuredImage?.alt}
                    >
                      <GatsbyImage
                        image={featuredImage?.fluid}
                        alt={featuredImage?.alt}
                      />
                    </Link>
                  </li>
                  <li className="z-30 flex items-start justify-end pr-3 mx-5 mb-3 -mt-14">
                    <p className="bg-[#01487e] text-white text-xs font-Montserrat font-semibold p-2">
                      <span className="text-2xl">{post.day.split("/")[0]}</span>
                      <br />
                      {post.day.split("/")[1]}
                    </p>
                  </li>
                  <li
                    className="flex items-start justify-start mx-5 mb-1"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <Link
                      to={`${post?.uri}`}
                      itemProp="url"
                      className="w-full font-semibold text-left text-22 font-Montserrat hover:underline group-hover:text-themeBlue-600"
                    >
                      {parse(title)}
                    </Link>
                  </li>
                  <li
                    className="flex items-start justify-start mx-5 mb-3 font-Montserrat"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    {parse(post?.excerpt, options)}
                  </li>
                  <li className="mt-auto">
                    <hr className="flex mx-5 mt-auto border-b-[1/2] border-gray-500" />
                  </li>
                  <li>
                    <Link
                      to={`${post?.uri}`}
                      itemProp="url"
                      className="flex items-center justify-between w-full px-5 pb-5 text-sm font-semibold text-left font-Montserrat group-hover:text-themeBlue-600"
                    >
                      See Full Article
                      <span className="text-2xl duration-500 ease-in-out group-hover:rotate-180 group-hover:text-themeBlue-600">
                        &#10230;
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default HomeNews
