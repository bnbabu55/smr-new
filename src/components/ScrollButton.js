import React, { useState, useEffect } from "react"

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 120) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour in place of 'smooth' */
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={` ${isVisible ? "fixed bottom-20 right-10 z-100" : ""}`}
      aria-label="Scroll to top button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 group"
        viewBox="0 0 20 20"
      >
        <circle cx="9" cy="9" fill="#ffffff" r="6" />
        <path
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
          clipRule="evenodd"
          fillRule="evenodd"
          className="transition duration-300 ease-in-out delay-150 fill-current text-themeYellow-400 group-hover:text-themeAccent"
        />
      </svg>
    </button>
  )
}

export default ScrollButton
