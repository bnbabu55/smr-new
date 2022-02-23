import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import ScrollButton from "./ScrollButton"

const Layout = ({ isHomePage, children }) => {
  return (
    <div data-is-root-path={isHomePage} className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollButton />
    </div>
  )
}

export default Layout
