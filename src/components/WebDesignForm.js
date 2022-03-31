import React from "react"
import { Link } from "gatsby"
import { useBetween } from "use-between"

const WebDesignForm = ({ useShareableState }) => {
  const { webDesign, setWebDesign, setFormWeb } = useBetween(useShareableState)

  return (
    <div className="w-4/5 py-5 mx-auto my-5 border-2 border-gray-300 rounded">
      <form name="webdesignform">
        <div className="flex ml-5 justify-self-end">
          <Link
            to="/web-design-services"
            target="_blank"
            className="px-3 py-2 text-base text-white rounded bg-themeBlue-600"
          >
            Read More
          </Link>
        </div>
        <h3 className="py-5 text-3xl text-center underline text-themeOrange-400">
          Website Design, Development & Maintenance
        </h3>
        <ul className="grid grid-cols-1 mx-8 text-lg text-left webdesign-form lg:grid-cols-3 text-themeBlue-600">
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Assigned Project Manager
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Senior Graphic Designer
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Development Team Lead
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Site Navigation Approval
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Design Mockups
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Mobile Friendly Design
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Fast Page Load Times
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            News & Events (Blog)
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Content Management (CMS)
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Email Opt-In Captures
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Request Quote Forms
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Ecommerce Solutions
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            SEO Page Attributes
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Customer Testimonials
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Site Traffic Analytics
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Landing Page Design
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Hi-Res Stock Photos
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Video Libraries & Stream
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Ongoing Website Maintenance{" "}
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl font-bold text-themeOrange-400">
              &#62;
            </span>
            Page Copy Writing (Optional)
          </li>
        </ul>
        <div className="flex justify-between py-5 mx-10 mr-2">
          <div className="pl-1 hide-box">
            <Link
              to="#free-quote"
              className="invisible text-base underline text-themeBlue-600"
            >
              Scroll Down To Complete Form
            </Link>
          </div>
          <div className="text-base font-semibold text-right check-services text-themeOrange-400">
            <label>
              Select Services
              <input
                className="ml-2 text-lg topradio checked:bg-themeBlue-600 text-themeBlue-600 border-themeBlue-600 focus:ring-themeBlue-600"
                type="radio"
                id="webdesign"
                name="webdesign"
                value={webDesign}
                checked={webDesign === "webDesign"}
                onChange={() => {
                  setWebDesign("webDesign")
                  setFormWeb("webDesign")
                }}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default WebDesignForm
