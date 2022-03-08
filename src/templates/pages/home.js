import React from "react"
import { graphql } from "gatsby"
import HeroBanner from "../../components/HeroBanner"
import HomeNews from "../../components/HomeNews"
import HomePortfolio from "../../components/HomePortfolio"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Testimonials from "../../components/Testimonials"
import Statistics from "../../components/Statistics"
import SMServices from "../../components/SMServices"

const HomePage = ({ data: { page }, location }) => (
  <Layout location={location}>
    <Seo seoData={page?.seo} />
    <HeroBanner />
    <Statistics />
    <SMServices />
    <Testimonials />
    <HomeNews />
    <HomePortfolio />
    <button className="font-Montserrat fixed z-[99] top-20 right-0 origin-bottom-right px-5 py-2 font-semibold text-sm uppercase -rotate-90 rounded-tl rounded-tr bg-themeYellow-400">
      <a href="/search-marketing-website-design-proposal-form/">Quick Quote</a>
    </button>
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  query HomePageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      slug
      seo {
        fullHead
        schema {
          raw
        }
      }
    }
  }
`
