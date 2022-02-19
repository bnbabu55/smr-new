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
    const currentTitle = document.querySelectorAll("#title")
    currentTitle.forEach(function (item) {
      item.classList.remove("text-[#e55327]")
    })
    const currentSlide = parseInt(
      document.querySelector("#currentSlide").dataset.index
    )

    console.log("currentSlide: " + currentSlide)

    if (next < 0) {
      if (currentSlide <= 0) {
        targetSlide = testimonialSlides.nodes.length - 1
      } else {
        targetSlide = currentSlide - 1
      }
      setTestimonialSlide(() => ({
        id: targetSlide,
        title: testimonialSlides.nodes[targetSlide].frontmatter.title,
        memberRole: testimonialSlides.nodes[targetSlide].frontmatter.memberRole,
        body: testimonialSlides.nodes[targetSlide].body,
      }))
    } else {
      if (currentSlide === testimonialSlides.nodes.length - 1) {
        targetSlide = 0
      } else {
        targetSlide = currentSlide + 1
      }
      setTestimonialSlide(() => ({
        id: targetSlide,
        title: testimonialSlides.nodes[targetSlide].frontmatter.title,
        memberRole: testimonialSlides.nodes[targetSlide].frontmatter.memberRole,
        body: testimonialSlides.nodes[targetSlide].body,
      }))
    }

    currentTitle[targetSlide].classList.add("text-[#e55327]")
  }

  return (
    <div id="Testimonials" className="py-10 mx-auto overflow-hidden bg-white">
      <div className="container flex w-full mx-auto lg:w-10/12 gap-x-5">
        <div className="w-1/4 flex">
          <div className="flex flex-col w-1/4 mx-auto">
            <button onClick={e => handleClick(e, -1)} className="w-full">
              <span className="before:border-solid before:border-t-8 before:border-r-8 before:border-black before:content-[''] before:inline-block before:h-[1em] before:left-[0.15em] before:relative before:top-[0.15em] before:-rotate-45 before:align-top before:w-[1em]"></span>
            </button>
            <button onClick={e => handleClick(e, 1)} className="w-full">
              <span className="before:border-solid before:border-b-8 before:border-r-8 before:border-black before:content-[''] before:inline-block before:h-[1em] before:left-[0.15em] before:relative before:top-[0.15em] before:rotate-45 before:align-top before:w-[1em]"></span>
            </button>
          </div>
          <div className="flex flex-col w-3/4 mx-auto">
            {testimonialSlides?.nodes?.map((testimonialSlide, index) => {
              return (
                <div key={testimonialSlide.id} className="mb-3">
                  <div
                    className={`text-lg font-bold uppercase ${
                      index === 0 ? "text-[#e55327]" : ""
                    }`}
                    id="title"
                    data-index={index}
                  >
                    {testimonialSlide?.frontmatter?.title},
                  </div>
                  <div className="text-base">
                    {testimonialSlide?.frontmatter?.memberRole}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="w-3/4 lg:pl-10 pr-2 lg:pr-0 prose-lg text-justify max-w-none"
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
