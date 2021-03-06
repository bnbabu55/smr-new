import React, { useState } from "react"
import axios from "axios"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const SubscriptionForm = () => {
  const [emailValue, setEmailValue] = useState("")
  const [formResp, setFormResp] = useState({
    status: "",
    response: "",
    body_response: "",
  })
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault()

          // ReCaptcha verification
          if (!executeRecaptcha) {
            return
          }
          // This is the same as grecaptcha.execute on traditional html script tags
          const token = await executeRecaptcha("smr_subscribe_form")
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
              "https://smr-sandbox.com/wp-json/contact-form-7/v1/contact-forms/11738/feedback",
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
        className="w-full px-3 py-10 mx-auto border bg-themeOrange-300 border-themeOrange-300 lg:absolute lg:left-0 lg:right-0 lg:z-20 lg:-mt-16 rounded-2xl lg:w-10/12 lg:px-0"
      >
        <div className="flex flex-col items-center justify-between px-8 gap-y-3 lg:gap-y-0 lg:flex-row">
          <label
            htmlFor="newsEmail"
            className="block w-full text-[22px] font-bold tracking-normal text-center text-gray-700 lg:text-left"
          >
            Newsletter Signup
          </label>
          <input
            type="email"
            id="newsEmail"
            name="newsEmail"
            placeholder="Email"
            required
            className="w-full px-3 py-3 text-xs border-gray-300 rounded-full shadow-sm lg:w-4/6 focus:border-themeBlue-200 focus:ring-themeBlue-200"
            value={emailValue}
            onChange={event => {
              setEmailValue(event.target.value)
            }}
          />
          <button
            type="submit"
            className="w-2/6 py-2.5 text-base font-Montserrat font-semibold tracking-wide text-white rounded-full shadow-md font-MontserratBold bg-[#0b4f80] hover:bg-[#052740] ease-in-out duration-300 lg:-ml-10"
            aria-label="submit"
            disabled={formResp === "success" ? true : false}
          >
            {formResp === "success" ? "Subscribed" : "Sign Up"}
          </button>
        </div>
        <input
          type="checkbox"
          name="_mc4wp_subscribe_contact-form-7"
          value="1"
          defaultChecked={true}
          className="hidden"
        />
      </form>
      <div id="response-message">
        {formResp.status === "loading" && (
          <p className="text-sm text-black font-Montserrat">Sending....</p>
        )}
        {formResp.status === "error" && (
          <p className="text-sm text-red-600 font-Montserrat">
            {formResp.body_response}
          </p>
        )}
        {formResp.status === "success" && (
          <p className="text-sm text-green-600 font-Montserrat">
            Your form has been submitted successfully, thank you.
          </p>
        )}
        <p className="text-white">
          {formResp.status === "success" &&
            setTimeout(() => {
              setEmailValue("")
            }, 3000)}
        </p>
      </div>
    </>
  )
}

export default SubscriptionForm
