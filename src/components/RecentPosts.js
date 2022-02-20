import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

const RecentPosts = () => {
  const { recentPosts } = useStaticQuery(graphql`
    query WordPressRecentPost {
      recentPosts: allWpPost(sort: { fields: [date], order: DESC }, limit: 3) {
        nodes {
          id
          excerpt
          uri
          date(formatString: "MMMM DD, YYYY")
          month: date(formatString: "MMMM")
          title
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    width: 62
                    height: 50
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

  if (!recentPosts?.nodes || recentPosts.nodes === 0) return null

  let postMonth = ""
  let renderHeader = false
  return (
    <div className="recentposts" key="recent-post-wrapper">
      {recentPosts.nodes.map((post, i) => {
        const featuredImage = {
          fluid:
            post.featuredImage?.node?.localFile?.childImageSharp
              ?.gatsbyImageData,
          alt: post.featuredImage?.node?.alt || ``,
        }
        const title = post?.title
        if (postMonth !== post.month) {
          postMonth = post.month
          renderHeader = true
        } else {
          renderHeader = false
        }
        return (
          <div key={post.id + "-title"}>
            {renderHeader && (
              <h3 className="block py-2 mb-2 text-lg font-semibold border-b-2 font-Raleway text-themeBlue-600 border-themeBlue-600">
                {post?.month}
              </h3>
            )}
            <ul className="flex flex-row">
              <li>
                <GatsbyImage
                  image={featuredImage?.fluid}
                  alt={featuredImage?.alt}
                />
              </li>
              <li className="items-center justify-center mb-2 ml-1">
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2 className="-mt-2">
                      <Link to={`/news${post?.uri}`} itemProp="url">
                        <span
                          itemProp="headline"
                          className="text-xs tracking-wider uppercase font-LusitanaBold text-themeOrange-400"
                          style={{ lineHeight: "90%" }}
                        >
                          {parse(title)}
                        </span>
                      </Link>
                    </h2>
                    <p className="pb-1 text-xs font-Raleway text-themeBlue-600">
                      <span>{post?.date}</span>
                    </p>
                  </header>
                  <div
                    itemProp="description"
                    className="text-sm font-Raleway text-themeGray-200 line-clamp-2"
                  >
                    {parse(post?.excerpt, {
                      replace: ({ attribs }) =>
                        attribs && attribs.class === "read-more" && <></>,
                    })}
                  </div>
                </article>
              </li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default RecentPosts
