import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Categories from "../components/Categories"
import RecentPosts from "../components/RecentPosts"

const BlogIndex = ({
  data,
  pageContext: {
    nextPagePath,
    previousPagePath,
    currentPageBase,
    totalPages,
    currentPage,
    paginationArray,
  },
  location,
}) => {
  const posts = data.allWpPost.nodes
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages
  const seoData = data.archiveSeo.seo

  if (!posts.length) {
    return (
      <Layout location={location}>
        <Seo seoData={seoData} />
        <div className="w-10/12 mx-auto my-16 text-2xl font-semibold text-gray-600">
          <p>
            No blog posts found. Please add posts to your site and they'll
            appear here!
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Seo seoData={seoData} />

      <div className="my-16 text-gray-600">
        <div>
          <h2 className="text-5xl font-bold tracking-wide text-center font-Montserrat text-themeBlue-600">
            SEARCH MARKETING NEWS
          </h2>
          <p className="my-6 text-2xl font-semibold text-center uppercase font-Montserrat text-themeOrange-400">
            Seo and SEM Marketing & Website Design News
          </p>
          <p className="my-6 text-lg text-center font-Montserrat text-themeGray-200">
            Stay current on leading online marketing trends and the latest
            website development <br />
            practices by opting-in to receive our monthly News posts.
          </p>
        </div>
        <div className="all-blogs">
          <div className="main-content">
            <ol>
              {posts.map(post => {
                const featuredImage = {
                  fluid:
                    post.featuredImage?.node?.localFile?.childImageSharp
                      ?.gatsbyImageData,
                  alt: post.featuredImage?.node?.alt || ``,
                }
                const title = post?.title

                return (
                  <li key={post.uri.replace("/blog", "")} className="pb-8">
                    <ul className="flex flex-col md:flex-row">
                      <li className="w-full md:w-2/6">
                        <GatsbyImage
                          image={featuredImage?.fluid}
                          alt={featuredImage?.alt}
                        />
                      </li>
                      <li className="items-center justify-center w-full md:w-4/6 md:ml-20">
                        <article
                          className="post-list-item"
                          itemScope
                          itemType="http://schema.org/Article"
                        >
                          <header>
                            <h2 className="-mt-2">
                              <Link
                                to={`${post.uri.replace("/blog", "")}`}
                                itemProp="url"
                              >
                                <span
                                  itemProp="headline"
                                  className="text-base leading-none tracking-wider uppercase font-MontserratBold text-themeOrange-400"
                                >
                                  {parse(title)}
                                </span>
                              </Link>
                            </h2>
                            <p className="pb-2 text-sm font-Montserrat text-themeGray-200">
                              Posted by{" "}
                              <span>{`${post?.author?.node?.firstName} ${post?.author?.node?.lastName}`}</span>
                            </p>
                          </header>
                          <div
                            itemProp="description"
                            className="text-sm font-Montserrat text-themeGray-200"
                          >
                            {parse(post?.excerpt, {
                              replace: ({ attribs }) =>
                                attribs &&
                                attribs.class === "read-more" && <></>,
                            })}
                          </div>
                        </article>
                      </li>
                    </ul>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="sidebar">
            <RecentPosts />
            <Categories />
          </div>
        </div>
      </div>
      <div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
          }}
        >
          {!isFirst && (
            <li>
              <Link
                to={previousPagePath}
                rel="prev"
                className="px-3 py-1 text-lg font-semibold hover:text-themeBlue-600 rounded-xl font-PTSerif text-themeBlue-200 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-themeBlue-200"
              >
                {"<< Prev"}
              </Link>{" "}
            </li>
          )}
          {paginationArray.map((x, i) => {
            return (
              <li
                key={`pagination-number${x}+${i}`}
                style={{
                  margin: 0,
                }}
              >
                {x === "..." ? (
                  x
                ) : (
                  <Link
                    to={`${x === 1 ? currentPageBase : currentPageBase + x}`}
                    className={`px-3 py-1 rounded-lg ${
                      x === currentPage
                        ? "text-white bg-themeBlue-200 hover:bg-themeBlue-600 outline outline-1 outline-offset-2 outline-themeBlue-200"
                        : "text-themeBlue-200 hover:text-themeBlue-600"
                    }`}
                  >
                    {x}
                  </Link>
                )}
              </li>
            )
          })}
          {!isLast && (
            <li>
              <Link
                to={nextPagePath}
                rel="next"
                className="px-3 py-1 text-lg font-semibold hover:text-themeBlue-600 rounded-xl font-PTSerif text-themeBlue-200 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-themeBlue-200"
              >
                {"Next >>"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        author {
          node {
            firstName
            lastName
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED
                  width: 330
                  height: 190
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
    archiveSeo: wpPage(slug: { eq: "news" }) {
      seo {
        fullHead
        schema {
          raw
        }
      }
    }
  }
`
