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
                    width: 340
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
            className="mt-2 text-base text-justify font-Lusitana line-clamp-3"
          >
            {domToReact(domNode.children, options)}
          </p>
        )
      }

      if (domNode.attribs.class === "read-more") {
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
              className="text-5xl uppercase font-Raleway hover:underline"
            >
              Latest from the Blog
            </Link>
          </h2>

          <p className="pb-8 text-lg text-center font-Raleway">
            Stay Current on Search Marketing Resource events, industry news,
            recent projects, the latest design practices and online marketing
            advice - Opt In on our News Page and receive posts alerts to your
            email
          </p>
        </div>
        <ul className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-5">
          {homeNews.nodes.map((post, i) => {
            const featuredImage = {
              fluid:
                post.featuredImage?.node?.localFile?.childImageSharp
                  ?.gatsbyImageData,
              alt: post.featuredImage?.node?.alt || ``,
            }
            const title = post?.title
            return (
              <li key={post.id} className="flex">
                <ul className="flex flex-col gap-3 overflow-hidden bg-white shadow-xl rounded-xl">
                  <li className="flex items-start justify-start mb-3">
                    <Link
                      to={`/news${post?.uri}`}
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
                  <li className="z-30 flex items-start justify-end pr-3 mx-5 mb-3 -mt-16">
                    <p className="bg-[#01487e] text-white p-2">
                      {post.day.split("/")[0]}
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
                      to={`/news${post?.uri}`}
                      itemProp="url"
                      className="w-full text-lg font-bold text-left uppercase font-Raleway"
                    >
                      {parse(title)}
                    </Link>
                  </li>
                  <li
                    className="flex items-start justify-start mx-5 mb-3 font-Lusitana"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    {parse(post?.excerpt, options)}
                  </li>
                  <hr className="flex mx-5 mt-auto border-b border-gray-500" />
                  <Link
                    to={`/news${post?.uri}`}
                    itemProp="url"
                    className="flex justify-between w-full px-5 pb-5 text-lg font-bold text-left font-Lusitana"
                  >
                    Blog {i + 1} <span>&rarr;</span>
                  </Link>
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
