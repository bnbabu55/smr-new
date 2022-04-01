import React, { useState } from "react"
import { useBetween } from "use-between"
import axios from "axios"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const FreeQuoteForm = ({ useShareableState, OnlySEO }) => {
  const {
    setSelectedProgram,
    formProgram,
    setFormProgram,
    setWebDesign,
    formWeb,
    setFormWeb,
  } = useBetween(useShareableState)

  const [companyValue, setCompanyValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [fnameValue, setFNameValue] = useState("")
  const [lnameValue, setLNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [formResp, setFormResp] = useState({
    status: "",
    response: "",
    body_response: "",
  })
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <div className="pt-10">
      <form
        id="free-quote"
        className="flex flex-col justify-center m-10 text-base text-gray-700 free-quote-form align-center font-Montserrat"
        onSubmit={async event => {
          event.preventDefault()

          // ReCaptcha verification
          if (!executeRecaptcha) {
            return
          }
          // This is the same as grecaptcha.execute on traditional html script tags
          const token = await executeRecaptcha("smr_quote_form")
          console.log("received token: " + token)

          if (token.length <= 0) {
            console.log("recaptcha failed, form not submitted")
            return
          }

          const myForm = event.target
          const formData = new FormData(myForm)
          formData.append("_wpcf7_recaptcha_response", token)

          setFormResp({ ...formResp, status: "loading" })

          axios
            .post(
              "https://smr-sandbox.com/wp-json/contact-form-7/v1/contact-forms/11706/feedback",
              formData
            )
            .then(function (response) {
              if (response.data.status === "mail_sent") {
                setFormResp({
                  ...formResp,
                  status: "success",
                  response: response.data.response,
                  body_response: response.data.body_response,
                })
                console.log(response)
              } else {
                setFormResp({
                  ...formResp,
                  status: "error",
                  response: response.data.response,
                  body_response: response.data.body_response,
                })
                console.log(response)
              }
            })
            .catch(function (error) {
              setFormResp({
                ...formResp,
                status: "error",
                response: "",
                body_response: "Unknown error, please try again later.",
              })
              console.log(error)
            })
        }}
      >
        <div className="pb-4 text-xs font-semibold text-red-600 font-Montserrat">
          Required *
        </div>
        <div className="grid grid-cols-1 gap-y-6 lg:gap-y-6 lg:gap-x-6 lg:grid-cols-2">
          <div className="relative w-full col-start-1 col-end-2">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="text"
              placeholder="First"
              name="firstname"
              id="firstname"
              aria-label="First name"
              value={fnameValue}
              onChange={event => {
                setFNameValue(event.target.value)
              }}
            />
            <label
              htmlFor="firstname"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              First Name
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-2 row-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="text"
              placeholder="Last"
              name="lastname"
              id="lastname"
              aria-label="Last name"
              value={lnameValue}
              onChange={event => {
                setLNameValue(event.target.value)
              }}
            />
            <label
              htmlFor="lastname"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Last Name
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-3 row-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="tel"
              placeholder="Company"
              name="company"
              id="company"
              aria-label="Company Web address"
              value={companyValue}
              onChange={event => {
                setCompanyValue(event.target.value)
              }}
            />
            <label
              htmlFor="company"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Company
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-4 row-end-5 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="email"
              placeholder="Email"
              name="your-email"
              id="your-email"
              aria-label="email address"
              value={emailValue}
              onChange={event => {
                setEmailValue(event.target.value)
              }}
            />
            <label
              htmlFor="your-email"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="flex col-start-1 col-end-2 row-start-5 row-end-6 py-5 text-xs program-section gap-x-10 lg:col-span-2 lg:row-start-3 lg:row-end-4 md:text-base">
            <div className="program-section-heading">
              *Services Selected - Request Quote
            </div>
            <div className="flex flex-col program-section-content">
              <label className="inline-flex md:items-center">
                <input
                  type="radio"
                  id="targetsilver"
                  name="targetplan"
                  value={formProgram}
                  checked={formProgram === "silver"}
                  onChange={() => {
                    setSelectedProgram("silver")
                    setFormProgram("silver")
                  }}
                />
                <span className="pl-2">
                  Silver - Website Search Optimization
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="targetgold"
                  name="targetplan"
                  value={formProgram}
                  checked={formProgram === "gold"}
                  onChange={() => {
                    setSelectedProgram("gold")
                    setFormProgram("gold")
                  }}
                />
                <span className="pl-2">
                  Gold - Website Optimized, SEO Program &amp; Social Media
                  Management
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="targetplatinum"
                  name="targetplan"
                  value={formProgram}
                  checked={formProgram === "platinum"}
                  onChange={() => {
                    setSelectedProgram("platinum")
                    setFormProgram("platinum")
                  }}
                />
                <span className="pl-2">
                  Platinum - Website Optimized, SEO Program, Social Media &amp;
                  Email Marketing
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="targetsocial"
                  name="targetplan"
                  value={formProgram}
                  checked={formProgram === "social"}
                  onChange={() => {
                    setSelectedProgram("social")
                    setFormProgram("social")
                  }}
                />
                <span className="pl-2">Social - Social Media Management</span>
              </label>
              {OnlySEO === false && (
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="targetwebdesign"
                    name="targetwebdesign"
                    value={formWeb}
                    checked={formWeb === "webDesign"}
                    onChange={() => {
                      setWebDesign("webDesign")
                      setFormWeb("webDesign")
                    }}
                  />
                  <span className="pl-2">
                    Website Design, Development &amp; Maintenance
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-6 row-end-7 lg:col-span-2 lg:row-start-4 lg:row-end-5">
            <textarea
              className="w-full text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="textarea"
              placeholder="Message"
              rows="6"
              name="your-message"
              id="your-message"
              value={messageValue}
              onChange={event => {
                setMessageValue(event.target.value)
              }}
            />
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Message
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <button
            type="submit"
            className="w-full col-span-2 px-8 py-2 mt-5 text-base tracking-wider text-white uppercase rounded shadow-2xl bg-themeOrange-400 font-MontserratSemiBold"
          >
            Receive my free quote
          </button>
        </div>
      </form>
      <div id="response-message" style={{ padding: "20px" }}>
        {formResp.status === "loading" && (
          <p className="text-black font-Montserrat">Sending....</p>
        )}
        {formResp.status === "error" && (
          <p className="text-red-600 font-Montserrat">
            {formResp.body_response}
          </p>
        )}
        {formResp.status === "success" && (
          <p className="text-green-600 font-Montserrat">
            Your form has been submitted successfully, thank you.
          </p>
        )}
        <p className="text-white">
          {formResp.status === "success" &&
            setTimeout(() => {
              setFormResp("")
              setCompanyValue("")
              setEmailValue("")
              setFNameValue("")
              setLNameValue("")
              setMessageValue("")
              setWebDesign("")
              setFormWeb("")
              setSelectedProgram("silver")
              setFormProgram("silver")
            }, 3000)}
        </p>
      </div>
    </div>
  )
}

export default FreeQuoteForm
