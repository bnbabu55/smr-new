import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Testimonials = () => {
  const { testimonialSlides } = useStaticQuery(graphql`
    query {
      testimonialSlides: allMdx(
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
          }
        }
      }
    }
  `)

  const [testimonialSlide, setTestimonialSlide] = useState({
    id: 0,
    title: testimonialSlides.nodes[0].frontmatter.title,
    memberRole: testimonialSlides.nodes[0].frontmatter.memberRole,
    body: testimonialSlides.nodes[0].body,
  })

  const handleClick = (e, next) => {
    e.preventDefault()
    let targetSlide = 0
    let targetCard
    const currentTitle = document.querySelectorAll(".title")
    currentTitle.forEach(function (item) {
      item.classList.remove("text-themeOrange-600")
    })
    const currentSlide = parseInt(
      document.querySelector("#currentSlide").dataset.index
    )

    if (next === "prev") {
      if (currentSlide <= 0) {
        targetSlide = testimonialSlides.nodes.length - 1
      } else {
        targetSlide = currentSlide - 1
      }
    } else if (next === "next") {
      if (currentSlide === testimonialSlides.nodes.length - 1) {
        targetSlide = 0
      } else {
        targetSlide = currentSlide + 1
      }
    } else {
      targetSlide = next
    }
    setTestimonialSlide(() => ({
      id: targetSlide,
      title: testimonialSlides.nodes[targetSlide].frontmatter.title,
      memberRole: testimonialSlides.nodes[targetSlide].frontmatter.memberRole,
      body: testimonialSlides.nodes[targetSlide].body,
    }))

    console.log(
      `currentSlide: ${currentSlide} clicked ${next} target is ${targetSlide}`
    )

    currentTitle[targetSlide].classList.add("text-themeOrange-600")
    targetCard = document.querySelector(
      `div[name="card"][data-index="${targetSlide}"]`
    )
    targetCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  return (
    <div id="Testimonials" className="py-10 mx-auto overflow-hidden bg-white">
      <div className="container flex flex-col-reverse w-full px-3 mx-auto lg:px-0 lg:flex-row lg:w-10/12 gap-x-5">
        <div className="flex w-full pt-10 lg:pt-0 lg:w-1/4">
          <div className="flex flex-col w-1/4 mx-auto">
            <button
              onClick={e => handleClick(e, "prev")}
              className="w-full"
              aria-label="up arrow"
            >
              <span className="up-arrow relative after:absolute before:absolute after:content-[''] before:content-[''] after:w-[1em] after:h-[0.75em] before:w-[1em] before:h-[0.75em] after:bg-black before:bg-black after:z-[100] before:z-[100] after:top-[3vh] before:top-[3vh] before:right-[50%] before:skew-x-0 before:skew-y-[-25deg] after:left-[50%] after:skew-x-0 after:skew-y-[25deg]"></span>
            </button>
            <button
              onClick={e => handleClick(e, "next")}
              className="w-full"
              aria-label="down arrow"
            >
              <span className="down-arrow relative after:absolute before:absolute after:content-[''] before:content-[''] after:w-[1em] after:h-[0.75em] before:w-[1em] before:h-[0.75em] after:bg-black before:bg-black after:z-[100] before:z-[100] after:top-[9vh] before:top-[9vh] before:right-[50%] before:skew-x-0 before:skew-y-[25deg] after:left-[50%] after:skew-x-0 after:skew-y-[-25deg]"></span>
            </button>
          </div>
          <div className="flex flex-col w-full mx-auto overflow-y-scroll lg:w-3/4 max-h-72 gap-y-3">
            {testimonialSlides?.nodes?.map((testimonialSlide, index) => {
              return (
                <div
                  key={testimonialSlide.id}
                  className="mb-3"
                  name="card"
                  data-index={index}
                >
                  <button
                    className={`title text-lg font-semibold font-Montserrat uppercase ${
                      index === 0 ? "text-themeOrange-600" : ""
                    }`}
                    data-index={index}
                    onClick={e => handleClick(e, index)}
                  >
                    {testimonialSlide?.frontmatter?.title}
                  </button>
                  <div className="text-sm">
                    {testimonialSlide?.frontmatter?.memberRole}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="w-full px-3 pr-2 mx-auto prose text-justify lg:w-3/4 lg:px-20 max-w-none"
          id="currentSlide"
          data-index={testimonialSlide.id}
        >
          <MDXRenderer>{testimonialSlide.body}</MDXRenderer>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
