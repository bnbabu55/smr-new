import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useBetween } from "use-between"

const SEOProgramSelection = ({ seoImages, useShareableState }) => {
  const { selectedProgram, setSelectedProgram, setFormProgram } =
    useBetween(useShareableState)

  // const onChangeHandler = e => {
  //   const chosenPlan = e.target.value
  //   const hideBox =
  //     e.target.parentElement.parentElement.previousSibling.firstChild
  //   hideBox.classList.remove("invisible")
  //   const targetElem = document.getElementById(`target${chosenPlan}`)
  //   const resetElems = document.querySelectorAll(
  //     `input[name="services14N"]:not(:checked)`
  //   )
  //   for (let i = 0; i < resetElems.length; i++) {
  //     resetElems[
  //       i
  //     ].parentElement.parentElement.previousSibling.firstChild.classList.add(
  //       "invisible"
  //     )
  //   }
  //   targetElem.checked = true
  // }
  return (
    <form
      name="pricingform"
      className="flex flex-col my-20 pricing-item lg:flex-row gap-x-5"
    >
      <ul
        className="flex flex-col w-full bg-white lg:w-1/4"
        style={{ filter: "drop-shadow(0 0px 20px rgba(0, 0, 0, 0.72))" }}
      >
        <li className="icon">
          <div className="p-3 mx-auto overflow-hidden bg-white rounded-full w-28 h-28 -mt-14">
            <GatsbyImage
              image={seoImages?.nodes[0]?.childImageSharp?.gatsbyImageData}
              alt="SEO program 1 features"
              className="mx-auto"
            />
          </div>
          <p className="py-4 text-lg text-center font-MontserratSemiBold text-themeOrange-400">
            Silver
          </p>
          <p className="px-2 py-1 mx-4 my-3 text-base text-center text-white font-Montserrat bg-themeBlue-600">
            Website Search Optimization
          </p>
          <p className="px-2 py-1 my-3 text-base text-center font-Montserrat">
            Every page of your website is analyzed, reviewed and updated with
            SEO best practices to significally increase your keyword search
            rankings and visibility. 100% Turn-Key.{" "}
            <Link
              className="text-base font-Montserrat text-themeOrange-400"
              to="website-optimization-program.php"
            >
              Read more...
            </Link>
          </p>
        </li>
        <li className="flex-1 ml-8 text-base text-themeBlue-600">
          <ul>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Assigned SEO Manager
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Keyword Research
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Competitor Analysis
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              SEO Audit &amp; Repairs
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Website Copy Rewritten
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              SEO Attributes Added
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Page Speed Increased
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Website Audit Reports
            </li>
          </ul>
        </li>
        <li className="inline-flex items-end pt-5 pb-5 mr-2">
          <div className="flex-1 pl-1 hide-box">
            <Link
              to="#free-quote"
              className={`${
                selectedProgram === "silver" ? "visible" : "invisible"
              } text-base underline text-themeBlue-600`}
            >
              Scroll Down To Complete Form
            </Link>
          </div>
          <div className="flex-1 text-base font-semibold text-right justify-self-end check-services text-themeOrange-400">
            <label>
              Select Services
              <input
                className="ml-2 text-lg topradio checked:bg-themeBlue-600 text-themeBlue-600 border-themeBlue-600 focus:ring-themeBlue-600"
                type="radio"
                id="silver"
                name="services14N"
                value={selectedProgram}
                checked={selectedProgram === "silver"}
                onChange={() => {
                  setSelectedProgram("silver")
                  setFormProgram("silver")
                }}
              />
            </label>
          </div>
        </li>
      </ul>
      <ul
        className="flex flex-col w-full mt-20 bg-white lg:w-1/4 lg:mt-0"
        style={{ filter: "drop-shadow(0 0px 20px rgba(0, 0, 0, 0.72))" }}
      >
        <li className="icon">
          <div className="p-3 mx-auto overflow-hidden bg-white rounded-full w-28 h-28 -mt-14">
            <GatsbyImage
              image={seoImages?.nodes[1]?.childImageSharp?.gatsbyImageData}
              alt="SEO program 2 features"
              className="mx-auto mt-1.5"
            />
          </div>
          <p className="py-3 text-lg text-center font-MontserratSemiBold text-themeOrange-400">
            Gold
          </p>
          <p className="px-2 py-1 mx-4 my-3 text-sm text-center text-white font-Montserrat bg-themeBlue-600">
            Website Optimized, SEO Program &amp; Social Media Management
          </p>
          <p className="px-2 py-1 my-3 text-base text-center font-Montserrat">
            This is a full service offering that is ongoing, month to month. All
            efforts from Package #1 are included plus Blog Posts, Business
            Directory Listings and Social Media managed.{" "}
            <Link
              className="text-base font-Montserrat text-themeOrange-400"
              to="website-optimization-program.php"
            >
              Read more...
            </Link>
          </p>
        </li>
        <li className="flex-1 ml-8 text-base text-left text-themeBlue-600">
          <ul>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              SEO 24/7 Dashboard
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Weekly Performance Reports
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Business Directory Updates
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Google My Business
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Social Media Managed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Youtube Videos
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Tagged Pinterest Images
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Facebook Articles
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              LinkedIn Posts
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Twitter Tweets Managed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Yelp Account Updated
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Optimized Press Releases
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Monthly Blog Articles
            </li>
          </ul>
        </li>
        <li className="flex flex-col pt-5 pb-5 mr-2">
          <div className="py-3 text-base text-center">
            *Includes Silver Services
          </div>
          <div className="inline-flex items-end">
            <div className="flex-1 pl-1 hide-box">
              <Link
                to="#free-quote"
                className={`${
                  selectedProgram === "gold" ? "visible" : "invisible"
                } text-base underline text-themeBlue-600`}
              >
                Scroll Down To Complete Form
              </Link>
            </div>
            <div className="flex-1 text-base font-semibold text-right justify-self-end check-services text-themeOrange-400">
              <label>
                Select Services
                <input
                  className="ml-2 text-lg topradio checked:bg-themeBlue-600 text-themeBlue-600 border-themeBlue-600 focus:ring-themeBlue-600"
                  type="radio"
                  id="gold"
                  name="services14N"
                  value={selectedProgram}
                  checked={selectedProgram === "gold"}
                  onChange={() => {
                    setSelectedProgram("gold")
                    setFormProgram("gold")
                  }}
                />
              </label>
            </div>
          </div>
        </li>
      </ul>
      <ul
        className="flex flex-col w-full mt-20 bg-white lg:w-1/4 lg:mt-0"
        style={{ filter: "drop-shadow(0 0px 20px rgba(0, 0, 0, 0.72))" }}
      >
        <li className="icon">
          <div className="p-3 mx-auto overflow-hidden bg-white rounded-full w-28 h-28 -mt-14">
            <GatsbyImage
              image={seoImages?.nodes[2]?.childImageSharp?.gatsbyImageData}
              alt="SEO program 3 features"
              className="mx-auto"
            />
          </div>
          <p className="py-3 text-lg text-center font-MontserratSemiBold text-themeOrange-400">
            Platinum
          </p>
          <p className="px-2 py-1 mx-4 my-3 text-sm text-center text-white font-Montserrat bg-themeBlue-600">
            Website Optimized, SEO Program, Social Media &amp; Email Marketing
          </p>
          <p className="px-2 py-1 my-3 text-base text-center font-Montserrat">
            This group of services is very effective to increase your keyword
            search rankings quickly but also includes the management of the
            monthly email marketing campaigns. All other SEO services are
            provided as well.{" "}
            <Link
              className="text-base font-Montserrat text-themeOrange-400"
              to="website-optimization-program.php"
            >
              Read more...
            </Link>
          </p>
        </li>
        <li className="flex-1 ml-8 text-base text-left text-themeBlue-600">
          <ul>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              SEO 24/7 Dashboard
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Weekly Performance Reports
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Business Directory Updates
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Google My Business
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Social Media Managed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Youtube Videos
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Tagged Pinterest Images
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Facebook Articles
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Email List Uploaded
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Newsletter Template Designed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Newsletter Written
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Email Published
            </li>
          </ul>
        </li>
        <li className="flex flex-col pt-5 pb-5 mr-2">
          <div className="py-3 text-base text-center">
            *Includes Silver &amp; Gold Services
          </div>
          <div className="inline-flex items-end">
            <div className="flex-1 pl-1 hide-box">
              <Link
                to="#free-quote"
                className={`${
                  selectedProgram === "platinum" ? "visible" : "invisible"
                } text-base underline text-themeBlue-600`}
              >
                Scroll Down To Complete Form
              </Link>
            </div>
            <div className="flex-1 text-base font-semibold text-right justify-self-end check-services text-themeOrange-400">
              <label>
                Select Services
                <input
                  className="ml-2 text-lg topradio checked:bg-themeBlue-600 text-themeBlue-600 border-themeBlue-600 focus:ring-themeBlue-600"
                  type="radio"
                  id="platinum"
                  name="services14N"
                  value={selectedProgram}
                  checked={selectedProgram === "platinum"}
                  onChange={() => {
                    setSelectedProgram("platinum")
                    setFormProgram("platinum")
                  }}
                />
              </label>
            </div>
          </div>
        </li>
      </ul>
      <ul
        className="flex flex-col w-full mt-20 bg-white lg:w-1/4 lg:mt-0"
        style={{ filter: "drop-shadow(0 0px 20px rgba(0, 0, 0, 0.72))" }}
      >
        <li className="icon">
          <div className="p-3 mx-auto overflow-hidden bg-white rounded-full w-28 h-28 -mt-14">
            <GatsbyImage
              image={seoImages?.nodes[3]?.childImageSharp?.gatsbyImageData}
              alt="SEO program 4 features"
              className="mx-auto"
            />
          </div>
          <p className="py-3 text-lg text-center font-MontserratSemiBold text-themeOrange-400">
            Social
          </p>
          <p className="px-2 py-1 mx-4 my-3 text-base text-center text-white font-Montserrat bg-themeBlue-600">
            Social Media Management
          </p>
          <p className="px-2 py-1 my-3 text-base text-center font-Montserrat">
            All of your social media accounts will be reviewed and updated.
            Keyboard 'rich' industry related articles will be written, submitted
            for your approval and posted. Visitor activity and reviews posted
            will be traced.{" "}
            <Link
              className="text-base font-Montserrat text-themeOrange-400"
              to="website-optimization-program.php"
            >
              Read more...
            </Link>
          </p>
        </li>
        <li className="flex-1 ml-8 text-base text-left text-themeBlue-600">
          <ul>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Blog Post(Optional)
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              SEO 24/7 Dashboard
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Weekly Performance Reports
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Business Directory Updates
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Google My Business
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Social Media Managed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Youtube Videos
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Tagged Pinterest Images
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Facebook Articles
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              LinkedIn Posts
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Twitter Tweets Managed
            </li>
            <li className="text-base text-left text-themeBlue-600">
              <span className="mr-3 text-lg font-bold text-themeOrange-400">
                &#10003;
              </span>
              Yelp Account Updated
            </li>
          </ul>
        </li>
        <li className="inline-flex items-end pt-5 pb-5 mr-2">
          <div className="flex-1 pl-1 hide-box">
            <Link
              to="#free-quote"
              className={`${
                selectedProgram === "social" ? "visible" : "invisible"
              } text-base underline text-themeBlue-600`}
            >
              Scroll Down To Complete Form
            </Link>
          </div>
          <div className="flex-1 text-base font-semibold text-right justify-self-end check-services text-themeOrange-400">
            <label>
              Select Services
              <input
                className="ml-2 text-lg topradio checked:bg-themeBlue-600 text-themeBlue-600 border-themeBlue-600 focus:ring-themeBlue-600"
                type="radio"
                id="social"
                name="services14N"
                value={selectedProgram}
                checked={selectedProgram === "social"}
                onChange={() => {
                  setSelectedProgram("social")
                  setFormProgram("social")
                }}
              />
            </label>
          </div>
        </li>
      </ul>
    </form>
  )
}

export default SEOProgramSelection
