import React, { useState } from "react"
import axios from "axios"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const FreeAuditForm = ({ home }) => {
  const [webUrlValue, setWebUrlValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [fnameValue, setFNameValue] = useState("")
  const [lnameValue, setLNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [formResp, setFormResp] = useState({
    status: "",
    response: "",
    body_response: "",
  })
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <div
      id="freeauditform"
      className={`pt-5 my-10 border-b pb-5 ${
        home ? "bg-themeOrange-700" : "bg-themeBlue-600"
      } border-gray-300`}
    >
      <div className="flex flex-col items-center justify-center top_content">
        <div className="pt-8 pb-5 text-2xl text-center text-white font-MontserratBold">
          Is Your Website Search Engine Optimized? Get a Free Website SEO Audit!
        </div>
        <div
          className={`w-11/12 ${
            home ? "bg-themeOrange-400" : "bg-themeBlue-200"
          } mx-auto`}
        >
          <form
            className="m-10 text-base audit-form font-Montserrat"
            onSubmit={async event => {
              event.preventDefault()

              // ReCaptcha verification
              if (!executeRecaptcha) {
                return
              }
              // This is the same as grecaptcha.execute on traditional html script tags
              const token = await executeRecaptcha("smr_audit_form")
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
                  "https://smr-sandbox.com/wp-json/contact-form-7/v1/contact-forms/10521/feedback",
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="order-1 text-2xl text-white uppercase font-MontserratBold md:col-span-2 lg:col-span-1">
                Free Site Audit!
              </div>
              <input
                className="order-1 w-full p-3 border border-black rounded"
                type="text"
                placeholder="First Name"
                name="first-name"
                id="first-name"
                value={fnameValue}
                onChange={event => {
                  setFNameValue(event.target.value)
                }}
              />
              <input
                className="order-1 w-full p-3 border border-black rounded"
                type="text"
                placeholder="Last Name"
                name="last-name"
                id="last-name"
                value={lnameValue}
                onChange={event => {
                  setLNameValue(event.target.value)
                }}
              />
              <input
                className="order-1 w-full p-3 border border-black rounded"
                type="text"
                placeholder="e.g http(s)://example.com"
                name="your-website"
                id="your-website"
                value={webUrlValue}
                onChange={event => {
                  setWebUrlValue(event.target.value)
                }}
              />
              <div className="order-2 text-white lg:order-1">Recaptcha</div>
              <input
                className="order-1 w-full p-3 border border-black rounded"
                type="email"
                placeholder="Email"
                name="your-email"
                id="your-email"
                value={emailValue}
                onChange={event => {
                  setEmailValue(event.target.value)
                }}
              />
              <input
                className="order-1 w-full p-3 border border-black rounded"
                type="tel"
                placeholder="Phone"
                name="your-phone"
                id="your-phone"
                value={phoneValue}
                onChange={event => {
                  setPhoneValue(event.target.value)
                }}
              />
              <button
                id="freeaudit-submit"
                type="submit"
                className={`w-full order-3 text-white uppercase 
                ${
                  home ? "bg-themeBlue-200" : "bg-themeOrange-400"
                }                 
                font-MontserratSemiBold px-16 py-3 tracking-wider text-base shadow-2xl rounded`}
                disabled={formResp === "success" ? true : false}
              >
                {formResp === "success" ? "Submitted" : "Submit"}
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
                  setWebUrlValue("")
                  setEmailValue("")
                  setFNameValue("")
                  setLNameValue("")
                  setPhoneValue("")
                }, 3000)}
            </p>
          </div>
        </div>
        <p className="py-5 mx-5 text-lg text-center text-white font-Montserrat">
          The Search Marketing Resource team will review your website and
          deliver a report that provides both a graded review on how well your
          site has been Search Engine optimized for the keywords or phrases you
          are targeting but also direct action items that if followed will help
          to increase our keyword search rankings.
        </p>
      </div>
    </div>
  )
}

export default FreeAuditForm
