import React, { useState } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import validate from "../helpers/validate"
import MaskedInput from "react-text-mask"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const PaymentForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ]

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    stepOne: {
      amount: { value: "", required: true },
      invoice: { value: "", required: true },
      payType: { value: "onetime", required: true },
      frequency: { value: "", required: false },
      comments: { value: "", required: false },
    },
    stepTwo: {
      ccNumber: { value: "", required: true },
      expiry: { value: "", required: true },
      cvv: { value: "", required: false },
      firstName: { value: "", required: true },
      lastName: { value: "", required: true },
      addr1: { value: "", required: true },
      addr2: { value: "", required: false },
      city: { value: "", required: true },
      state: { value: "", required: true },
      zip: { value: "", required: true },
    },
  })
  const [errors, setErrors] = useState({})
  const [formResp, setFormResp] = useState({
    status: "",
    response: "",
    body_response: "",
  })

  const updateForm = (stepKey, e) => {
    e.persist()

    let value = e.target.value === "radio" ? e.target.checked : e.target.value

    if (e.target.name === "zip") {
      value = value.replace(/-$/, "")
    } else if (e.target.name === "ccNumber") {
      value = value.replaceAll(/\s/g, "")
    }

    setFormData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [e.target.name]: {
          ...prev[stepKey][e.target.name],
          value: value,
        },
      },
    }))
  }

  const stepChangeHandler = (values, e) => {
    e.preventDefault()
    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1)
    }
  }

  const submitHandler = async (values, e) => {
    e.preventDefault()

    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      console.log("errors found: " + JSON.stringify(newErrors, null))
      return
    }

    setFormResp({ ...formResp, status: "loading" })

    // ReCaptcha verification
    if (!executeRecaptcha) {
      return
    }
    // This is the same as grecaptcha.execute on traditional html script tags
    const token = await executeRecaptcha("smr_payment_form")
    console.log("received token: " + token)

    if (token.length > 0) {
      console.log("recaptcha failed, form not submitted")
      return
    }

    const submitForm = {
      amount: formData.stepOne.amount.value,
      invoice: formData.stepOne.invoice.value,
      payType: formData.stepOne.payType.value,
      frequency: formData.stepOne.frequency.value,
      comments: formData.stepOne.comments.value,
      ccNumber: formData.stepTwo.ccNumber.value,
      expiry: formData.stepTwo.expiry.value,
      cvv: formData.stepTwo.cvv.value,
      firstName: formData.stepTwo.firstName.value,
      lastName: formData.stepTwo.lastName.value,
      addr1: formData.stepTwo.addr1.value,
      addr2: formData.stepTwo.addr2.value,
      city: formData.stepTwo.city.value,
      state: formData.stepTwo.state.value,
      zip: formData.stepTwo.zip.value,
      recaptchaToken: token,
    }

    console.log("Form data before api call: " + JSON.stringify(submitForm))

    axios
      .post(
        "https://smr-sandbox.com/wp-json/smr-authnet/v1/post_payments",
        // "http://msform.test:8080/wp-json/smr-authnet/v1/post_payments",
        submitForm
      )
      .then(function (response) {
        if (response.data.status === "1" || response.data.status === "Ok") {
          setFormResp({
            ...formResp,
            status: "success",
            response: response.data.response,
            body_response: response.data.body_response,
          })
          console.log("Success response: " + JSON.stringify(response, null))
        } else {
          setFormResp({
            ...formResp,
            status: "error",
            response: response.data.response,
            body_response: response.data.body_response,
          })
          console.log("Error response: " + JSON.stringify(response, null))
        }
      })
      .catch(function (error) {
        console.log(error)
        setFormResp({
          ...formResp,
          status: "error",
          response: "",
          body_response: "Unknown error, please try again later.",
        })
      })
  }

  return (
    <div className="w-full mx-auto border border-gray-700 rounded contact-wrapper">
      <form
        className="flex flex-col justify-center m-10 text-base text-gray-700 contact-form align-center font-Montserrat"
        onSubmit={e => submitHandler(formData.stepTwo, e)}
      >
        {step === 1 && (
          <>
            <div className="pb-5 text-lg font-bold font-Montserrat">
              Step 1 of 2
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="relative col-start-1 col-end-2 row-start-1 row-end-2">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                  placeholder="Amount"
                  onChange={e => updateForm("stepOne", e)}
                  value={formData.stepOne.amount.value}
                  autoComplete="off"
                />
                <label
                  htmlFor="amount"
                  className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Amount
                </label>
                <div
                  className={`text-red-600 h-6 ${
                    errors["amount"] ? "visible" : "invisible"
                  }`}
                >
                  {errors["amount"]}
                </div>
              </div>

              <div className="relative col-start-1 col-end-2 row-start-2 row-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
                <input
                  id="invoice"
                  name="invoice"
                  type="text"
                  className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                  placeholder="Invoice number"
                  onChange={e => updateForm("stepOne", e)}
                  value={formData.stepOne.invoice.value}
                  autoComplete="off"
                />
                <label
                  htmlFor="invoice"
                  className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Invoice
                </label>
                <div
                  className={`text-red-600 h-6 ${
                    errors["invoice"] ? "visible" : "invisible"
                  }`}
                >
                  {errors["invoice"]}
                </div>
              </div>

              <div className="relative col-start-1 col-end-2 row-start-3 row-end-4 lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-3">
                <textarea
                  id="comments"
                  name="comments"
                  type="textarea"
                  rows="6"
                  className="w-full text-gray-600 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                  placeholder="Your comments here"
                  onChange={e => updateForm("stepOne", e)}
                  value={formData.stepOne.comments.value}
                  autoComplete="off"
                />
                <label
                  htmlFor="comments"
                  className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Comments
                </label>
                <div
                  className={`text-red-600 h-6 ${
                    errors["comments"] ? "visible" : "invisible"
                  }`}
                >
                  {errors["comments"]}
                </div>
              </div>
              <fieldset className="col-start-1 col-end-2 row-start-4 row-end-5 p-3 border border-gray-700 border-solid rounded lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
                <legend className="text-base text-gray-600">
                  Payment Type
                </legend>
                <div className="flex items-center justify-start">
                  <label
                    htmlFor="payType"
                    className="pr-3 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 peer-focus:text-base"
                  >
                    One Time
                  </label>
                  <input
                    name="payType"
                    type="radio"
                    className="text-blue-600 placeholder-transparent border border-gray-700 rounded-lg shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    onChange={e => updateForm("stepOne", e)}
                    value={"onetime"}
                    checked={
                      formData.stepOne.payType.value === "onetime"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="flex items-center justify-start mt-3">
                  <label
                    htmlFor="payType"
                    className="pr-3 text-base text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 peer-focus:text-base"
                  >
                    Recurring
                  </label>
                  <input
                    name="payType"
                    type="radio"
                    className="text-blue-600 placeholder-transparent border border-gray-700 rounded-lg shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    onChange={e => updateForm("stepOne", e)}
                    value={"recurring"}
                    checked={
                      formData.stepOne.payType.value === "recurring"
                        ? true
                        : false
                    }
                  />
                </div>
              </fieldset>
              <div
                className={`flex flex-col ${
                  formData.stepOne.payType.value === "recurring"
                    ? "visible"
                    : "hidden"
                } col-start-1 col-end-2 row-start-5 row-end-6 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3`}
              >
                <label htmlFor="frequency" className="text-base text-gray-600">
                  Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  className="w-full text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm focus:outline-none focus:border-themeBlue-200"
                  onChange={e => updateForm("stepOne", e)}
                  value={formData.stepOne.frequency.value}
                >
                  <option value="1">Monthly</option>
                  <option value="2">Yearly</option>
                </select>
              </div>
              <input
                name="makepayment"
                type="button"
                value="NEXT"
                className="block w-full col-start-1 col-end-2 row-start-6 row-end-7 px-4 py-2 mt-10 font-semibold text-center text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
                onClick={e => stepChangeHandler(formData.stepOne, e)}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="pb-5 text-lg font-bold font-Montserrat">
              Step 2 of 2
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-5">
              <div className="flex flex-col w-full gap-y-6">
                <div className="flex gap-x-5">
                  <div className="relative w-full">
                    <input
                      id="invoice2"
                      name="invoice2"
                      type="text"
                      className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                      placeholder="Invoice number"
                      value={formData.stepOne.invoice.value}
                      readOnly={"readonly"}
                    />
                    <label
                      htmlFor="invoice2"
                      className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Invoice
                    </label>
                  </div>

                  <div className="relative w-full">
                    <input
                      id="amount2"
                      name="amount2"
                      type="text"
                      className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                      placeholder="Amount"
                      value={formData.stepOne.amount.value}
                      readOnly={"readonly"}
                    />
                    <label
                      htmlFor="amount2"
                      className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Amount
                    </label>
                  </div>
                </div>
                <div className="relative lg:mt-6">
                  <MaskedInput
                    id="ccNumber"
                    name="ccNumber"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="Credit Card Number"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.ccNumber.value}
                    autoComplete="off"
                    guide={false}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                  <label
                    htmlFor="ccNumber"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Credit Card Number
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["ccNumber"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["ccNumber"]}
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="relative w-full">
                    <MaskedInput
                      id="expiry"
                      name="expiry"
                      type="text"
                      className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                      placeholder="YYYY-MM"
                      onChange={e => updateForm("stepTwo", e)}
                      value={formData.stepTwo.expiry.value}
                      autoComplete="off"
                      guide={false}
                      mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                    />
                    <label
                      htmlFor="expiry"
                      className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Expiration Date (YYYY-MM)
                    </label>
                    <div
                      className={`text-red-600 h-6 ${
                        errors["expiry"] ? "visible" : "invisible"
                      }`}
                    >
                      {errors["expiry"]}
                    </div>
                  </div>
                  <div className="relative w-full">
                    <MaskedInput
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="CVV"
                      className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                      onChange={e => updateForm("stepTwo", e)}
                      value={formData.stepTwo.cvv.value}
                      autoComplete="off"
                      guide={false}
                      mask={[/\d/, /\d/, /\d/, /\d?/]}
                    />
                    <label
                      htmlFor="cvv"
                      className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      CVV
                    </label>
                    <div
                      className={`text-red-600 h-6 ${
                        errors["cvv"] ? "visible" : "invisible"
                      }`}
                    >
                      {errors["cvv"]}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="First Name"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.firstName.value}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["firstName"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["firstName"]}
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="Last Name"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.lastName.value}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["lastName"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["lastName"]}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mt-5 gap-y-6 lg:mt-0">
                <div className="relative">
                  <input
                    id="addr1"
                    name="addr1"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="Address Line 1"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.addr1.value}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="addr1"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Address Line 1
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["addr1"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["addr1"]}
                  </div>
                </div>

                <div className="relative">
                  <input
                    id="addr2"
                    name="addr2"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="Address Line 2"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.addr2.value}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="addr2"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Address Line 2
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["addr2"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["addr2"]}
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border border-gray-700 rounded shadow-sm peer focus:outline-none focus:border-themeBlue-200"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.city.value}
                    placeholder="City"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="city"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    City
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["city"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["city"]}
                  </div>
                </div>
                <div className="relative flex flex-col">
                  <select
                    id="state"
                    name="state"
                    className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.state.value}
                  >
                    <option value="">Please Select</option>
                    {states.map(item => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      )
                    })}
                  </select>
                  <label
                    htmlFor="state"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    State
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["state"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["state"]}
                  </div>
                </div>
                <div className="relative">
                  <MaskedInput
                    id="zip"
                    name="zip"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent rounded peer focus:outline-none focus:border-themeBlue-200"
                    placeholder="Zip Code"
                    onChange={e => updateForm("stepTwo", e)}
                    value={formData.stepTwo.zip.value}
                    autoComplete="off"
                    guide={false}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                  <label
                    htmlFor="zip"
                    className="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Zip Code
                  </label>
                  <div
                    className={`text-red-600 h-6 ${
                      errors["zip"] ? "visible" : "invisible"
                    }`}
                  >
                    {errors["zip"]}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-5">
              <input
                type="button"
                value="Go Back"
                className="block w-full px-4 py-2 mt-10 font-semibold text-center text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80"
                onClick={() => {
                  setStep(1)
                }}
              />
              <input
                name="makepayment"
                type="submit"
                value="Submit"
                className="block w-full px-4 py-2 mt-10 font-semibold text-center text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80"
              />
            </div>
          </>
        )}
      </form>

      <div id="response-message" style={{ padding: "20px" }}>
        {formResp.status === "loading" && (
          <p className="text-black font-Montserrat">Processing....</p>
        )}
        {formResp.status === "error" && (
          <p className="text-red-600 font-Montserrat">
            {formResp.body_response}
          </p>
        )}
        {formResp.status === "success" && (
          <p className="text-green-600 font-Montserrat">
            {formResp.body_response}
          </p>
        )}
        <p className="text-white">
          {formResp === "success" &&
            setTimeout(() => {
              navigate("/")
            }, 3000)}
        </p>
      </div>
    </div>
  )
}

export default PaymentForm
