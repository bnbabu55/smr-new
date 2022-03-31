import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

const Header = ({ location }) => {
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "primary" }) {
        name
        menuItems {
          nodes {
            label
            url
            id
            path
            parentId
            childItems {
              nodes {
                label
                url
                id
                path
                parentId
              }
            }
          }
        }
      }
    }
  `)

  if (!wpMenu?.menuItems?.nodes || wpMenu.menuItems.nodes === 0) return null

  const filteredMenu = wpMenu?.menuItems?.nodes.filter(
    menuItem => menuItem.parentId === null
  )

  return (
    <header className="w-full pt-0 mt-0 text-white bg-themeBlue-500">
      <DesktopNav navMenu={filteredMenu} location={location} />
      <MobileNav navMenu={filteredMenu} />
    </header>
  )
}

export default Header
