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
  const [token, setToken] = useState("")

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
          const result = await executeRecaptcha("smr_subscribe_form")
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
        className="w-full px-3 py-10 mx-auto bg-[#fc9902] border border-[#fc9902] lg:absolute lg:left-0 lg:right-0 lg:z-20 lg:-mt-16 rounded-2xl lg:w-10/12 lg:px-0"
      >
        <div className="flex flex-col items-center justify-between px-8 gap-y-3 lg:gap-y-0 lg:flex-row">
          <label
            htmlFor="newsEmail"
            className="block w-full text-xl font-bold tracking-wider text-center text-gray-700 lg:text-left"
          >
            Newsletter Signup
          </label>
          <input
            type="email"
            id="newsEmail"
            name="newsEmail"
            placeholder="enter your email"
            required
            className="w-full px-3 text-sm border-gray-300 rounded-full shadow-sm lg:w-4/6 focus:border-themeBlue-200 focus:ring-themeBlue-200"
            value={emailValue}
            onChange={event => {
              setEmailValue(event.target.value)
            }}
          />
          <button
            type="submit"
            className="w-2/6 py-2.5 text-sm font-Raleway font-bold tracking-wider text-white uppercase rounded-full shadow-md font-RalewayBold bg-[#0b4f80] hover:bg-[#052740] ease-in-out duration-300 lg:-ml-10"
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
          <p className="text-sm text-black font-Raleway">Sending....</p>
        )}
        {formResp.status === "error" && (
          <p className="text-sm text-red-600 font-Raleway">
            {formResp.body_response}
          </p>
        )}
        {formResp.status === "success" && (
          <p className="text-sm text-green-600 font-Raleway">
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
