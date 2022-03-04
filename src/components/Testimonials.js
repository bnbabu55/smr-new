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
    console.log("next: " + next)
    let targetSlide = 0
    let targetCard
    // let targetCard = document.querySelector('div[name="card"]')
    const currentTitle = document.querySelectorAll("#title")
    currentTitle.forEach(function (item) {
      item.classList.remove("text-[#e55327]")
    })
    const currentSlide = parseInt(
      document.querySelector("#currentSlide").dataset.index
    )

    console.log("currentSlide: " + currentSlide)

    if (next === -1) {
      if (currentSlide <= 0) {
        targetSlide = testimonialSlides.nodes.length - 1
      } else {
        targetSlide = currentSlide - 1
      }
    } else if (next === 1) {
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
    currentTitle[targetSlide].classList.add("text-[#e55327]")
    targetCard = document.querySelector(
      `div[name="card"][data-index="${targetSlide}"]`
    )
    console.log("target: " + targetSlide)
    console.dir("taget name: " + Object.keys(targetCard))
    targetCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  return (
    <div id="Testimonials" className="py-10 mx-auto overflow-hidden bg-white">
      <div className="container flex w-full mx-auto lg:w-10/12 gap-x-5">
        <div className="flex w-1/4">
          <div className="flex flex-col w-1/4 mx-auto">
            <button onClick={e => handleClick(e, -1)} className="w-full">
              <span className="up-arrow relative after:absolute before:absolute after:content-[''] before:content-[''] after:w-[1em] after:h-[0.75em] before:w-[1em] before:h-[0.75em] after:bg-black before:bg-black after:z-[100] before:z-[100] after:top-[3vh] before:top-[3vh] before:right-[50%] before:skew-x-0 before:skew-y-[-25deg] after:left-[50%] after:skew-x-0 after:skew-y-[25deg]"></span>
            </button>
            <button onClick={e => handleClick(e, 1)} className="w-full">
              <span className="down-arrow relative after:absolute before:absolute after:content-[''] before:content-[''] after:w-[1em] after:h-[0.75em] before:w-[1em] before:h-[0.75em] after:bg-black before:bg-black after:z-[100] before:z-[100] after:top-[11vh] before:top-[11vh] before:right-[50%] before:skew-x-0 before:skew-y-[25deg] after:left-[50%] after:skew-x-0 after:skew-y-[-25deg]"></span>
            </button>
          </div>
          <div className="flex flex-col w-3/4 mx-auto overflow-y-scroll max-h-60">
            {testimonialSlides?.nodes?.map((testimonialSlide, index) => {
              return (
                <div
                  key={testimonialSlide.id}
                  className="mb-3"
                  name="card"
                  data-index={index}
                >
                  <button
                    className={`text-lg font-bold font-Raleway uppercase ${
                      index === 0 ? "text-[#e55327]" : ""
                    }`}
                    id="title"
                    data-index={index}
                    onClick={e => handleClick(e, index)}
                  >
                    {testimonialSlide?.frontmatter?.title},
                  </button>
                  <div className="text-base">
                    {testimonialSlide?.frontmatter?.memberRole}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="w-3/4 pr-2 prose-lg text-justify lg:pl-10 lg:pr-0 max-w-none"
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
