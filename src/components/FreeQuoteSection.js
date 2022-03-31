import React from "react"

const FreeQuoteSection = () => {
  return (
    <div
      id="FreeQuoteSection"
      className="py-10 mx-auto text-xl text-center text-white font-Montserrat"
    >
      <div className="flex flex-col lg:flex-row" id="form">
        <div className="flex-1 p-8 bg-themeBlue-600">
          <fieldset className="p-5 border-4 border-white border-opacity-50">
            <legend className="px-8 text-xl text-center text-white uppercase font-MontserratBold">
              Request SEO Proposal
            </legend>
            <p>
              View our varied Digital Marketing service offerings and select the
              program that best meets your online marketing requirements.
            </p>
            <p className="py-5 font-bold tracking-wider underline">
              Services to Include
            </p>
            <div className="flex justify-around text-sm text-left font-Montserrat md:text-lg">
              <ul className="list-disc">
                <li>Assigned SEO Manager</li>
                <li>Monthly Blog Articles</li>
                <li>Business Directory Updates</li>
                <li>Google My Business Page</li>
                <li>Social Media Venues Managed</li>
                <li>Optimized Press Releases</li>
                <li>YouTube Channel Managed</li>
                <li>Tagged Pinterest Images</li>
              </ul>
              <ul className="list-disc">
                <li>Keyword Research</li>
                <li>Competitor Analysis</li>
                <li>Website SEO Audit & Repairs</li>
                <li>SEO 24/7 Dashboard</li>
                <li>Weekly Performance Reports</li>
                <li>Website Copy Rewritten</li>
                <li>SEO Page Attributes Added</li>
                <li>Page Load Speed Increased</li>
              </ul>
            </div>
            <div className="my-5">
              <a
                href="/search-marketing-website-design-proposal-form"
                className="w-full px-8 py-2 mt-5 text-lg tracking-wider text-white uppercase shadow-2xl bg-themeOrange-400 font-MontserratSemiBold"
              >
                Free Quote
              </a>
            </div>
          </fieldset>
        </div>
        <div className="flex-1 p-8 bg-themeOrange-400">
          <fieldset className="p-5 mx-auto border-4 border-white border-opacity-50">
            <legend className="px-8 text-xl text-center text-white uppercase font-MontserratBold">
              Website Design Quote
            </legend>
            <p>
              We provide 100% turn-key website design and maintenance solutions
              for retail, business-to-business, industrial and consumer focused
              companies.
            </p>
            <p className="py-5 font-bold tracking-wider underline">
              Services to Include
            </p>
            <div className="flex justify-around text-sm text-left font-Montserrat md:text-lg">
              <ul className="list-disc">
                <li>Assigned Project Designer</li>
                <li>Development Test Manager</li>
                <li>Senior Graphics Lead</li>
                <li>Site Navigation Approval</li>
                <li>Mobile Friendly Design</li>
                <li>News & Events (Blog)</li>
                <li>Content Management (CMS)</li>
                <li>Email Opt-In Captures</li>
              </ul>
              <ul className="list-disc">
                <li>Request Quote Forms</li>
                <li>Ecommerce Solutions</li>
                <li>SEO Page Attributes</li>
                <li>Customer Testimonials</li>
                <li>Site Traffic Analytics</li>
                <li>Landing Page Design</li>
                <li>Video Libraries & Stream</li>
                <li>Ongoing Website Maintenance</li>
              </ul>
            </div>
            <div className="my-5">
              <a
                className="w-full px-8 py-2 mt-5 text-lg tracking-wider text-white uppercase shadow-2xl bg-themeBlue-600 font-MontserratSemiBold"
                href="/website-design-search-marketing-quote-form"
              >
                Free Quote
              </a>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default FreeQuoteSection
