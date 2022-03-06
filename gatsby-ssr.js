import "./src/styles/global.css"
import "swiper/css/bundle"

import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const reCaptchaKey = process.env.GATSBY_RECAPTCHA_SITE_KEY

export const wrapRootElement = ({ element }) => (
  <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
    {element}
  </GoogleReCaptchaProvider>
)
