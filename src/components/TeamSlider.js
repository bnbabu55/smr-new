import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SwiperCore, { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import parse from "html-react-parser"

SwiperCore.use([Autoplay])

const TeamSlider = () => {
  const { teamMembers } = useStaticQuery(graphql`
    query {
      teamMembers: allWpTeamMember {
        nodes {
          id
          title
          content
          memberRole
        }
      }
    }
  `)

  return (
    <div
      id="TeamSlider"
      className="w-11/12 py-10 mx-auto bg-white text-themeGray-300"
    >
      <div className="mx-auto text-center">
        <h2>
          <Link
            to={`/about`}
            className="text-5xl text-themeOrange-400 font-Montserrat hover:underline"
          >
            The Team
          </Link>
        </h2>

        <h3 className="my-5 text-2xl uppercase text-themeBlue-600 font-Montserrat">
          Knowledgeable, Experienced, Professional &amp; Dedicated
        </h3>

        <p className="text-lg text-center font-Montserrat">
          The Search Marketing Resource team members are the most seasoned and
          highly trained group of graphic designers, programmers and inbound
          marketers’ in the industry
        </p>
      </div>

      <Swiper
        className="w-full mx-auto"
        autoplay
        loop
        breakpoints={{
          // when window width is >= 240px
          240: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}

        // onSlideChange={() => console.log("slide change")}
        // onSwiper={swiper => console.log(swiper)}
      >
        <div className="swiper-button-prev"></div>
        <div className="w-3/4">
          {teamMembers.nodes.map(teamMember => {
            return (
              <SwiperSlide
                className="flex flex-col w-full p-5 text-center"
                key={teamMember.id}
              >
                <Link
                  to={`/about`}
                  className="pb-1 text-2xl uppercase font-Montserrat text-themeOrange-400"
                >
                  {teamMember.title}
                </Link>
                <div className="pb-5 text-base font-Montserrat">
                  {teamMember.memberRole}
                </div>
                <div
                  key={teamMember.id + "content"}
                  className="mb-5 text-base italic line-clamp-3"
                >
                  {parse(teamMember.content)}
                </div>
              </SwiperSlide>
            )
          })}
        </div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  )
}

export default TeamSlider
