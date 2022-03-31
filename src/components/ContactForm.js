import React, { useState } from "react"
import axios from "axios"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const ContactForm = () => {
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
  const [token, setToken] = useState("")

  return (
    <div className="w-full mx-auto border border-gray-700 rounded contact-wrapper">
      <form
        className="flex flex-col justify-center m-10 text-base text-gray-700 contact-form align-center font-Montserrat"
        onSubmit={async event => {
          event.preventDefault()

          // ReCaptcha verification
          if (!executeRecaptcha) {
            return
          }
          // This is the same as grecaptcha.execute on traditional html script tags
          const result = await executeRecaptcha("smr_contact_form")
          setToken(result)
          console.log("received token: " + result)

          if (result.length <= 0) {
            console.log("recaptcha failed, form not submitted")
            return
          }

          const myForm = event.target
          const formData = new FormData(myForm)
          formData.append("_wpcf7_recaptcha_response", result)

          setFormResp({ ...formResp, status: "loading" })

          axios
            .post(
              "https://smr-sandbox.com/wp-json/contact-form-7/v1/contact-forms/2536/feedback",
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
              placeholder="Company"
              name="company"
              id="company"
              value={companyValue}
              onChange={event => {
                setCompanyValue(event.target.value)
              }}
              required
            />
            <label
              htmlFor="company"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Company
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-2 row-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="email"
              placeholder="Email"
              name="your-email"
              id="your-email"
              value={emailValue}
              onChange={event => {
                setEmailValue(event.target.value)
              }}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-3 row-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="text"
              placeholder="First Name"
              name="firstname"
              id="firstname"
              value={fnameValue}
              onChange={event => {
                setFNameValue(event.target.value)
              }}
              required
            />
            <label
              htmlFor="firstname"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              First Name
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-4 row-end-5 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <input
              className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
              type="text"
              placeholder="Last"
              name="lastname"
              id="lastname"
              value={lnameValue}
              onChange={event => {
                setLNameValue(event.target.value)
              }}
              required
            />
            <label
              htmlFor="lastname"
              className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Last Name
            </label>
            <span className="absolute text-red-600 right-2 top-1">*</span>
          </div>
          <div className="relative w-full col-start-1 col-end-2 row-start-5 row-end-6 lg:col-span-2 lg:row-start-3 lg:row-end-4">
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
              required
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
            Submit
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
            }, 3000)}
        </p>
      </div>
    </div>
  )
}

export default ContactForm
