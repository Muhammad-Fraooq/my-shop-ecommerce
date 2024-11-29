"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorTypes } from "@/types/componentsTypes";

// Yup validation schema
const contactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ErrorTypes>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear individual error on input
    setGeneralError(null); // Clear general error on any input change
  };

  const onClickHandler = async () => {
    try {
      // Validate the form data
      await contactFormSchema.validate(formData, { abortEarly: false });

      // Clear errors if the form is valid
      setErrors({ name: "", email: "", subject: "", message: "" });
      setGeneralError(null);

      // Clear form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted("Form submitted successfully!");
      setTimeout(() => setSubmitted(null), 3000); // Auto-clear success message
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors:ErrorTypes = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);

        // If no fields are filled, show a general error
        if (Object.keys(newErrors).length === 4) {
          setGeneralError("Please fill out all fields.");
        } else {
          setGeneralError(null);
        }
      }
      setSubmitted(null);
    }
  };

  return (
    <div className="container mx-auto px-8 py-8 mt-16">
      {/* Layout for form and map side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="form-container bg-white p-8 rounded-lg shadow-xl border-2 border-gray-100">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Contact Us</h1>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {generalError && (
              <div className="text-red-600 text-center">{generalError}</div>
            )}

            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-2 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onClickHandler}
                className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>

            {submitted && (
              <div className="text-green-600 text-center mt-4">{submitted}</div>
            )}
          </form>
        </div>

        {/* Map Section */}
        <div className="map-container bg-gray-100 p-6 rounded-lg shadow-md">
          {/* <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Our Location</h2> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28677.052393969097!2d68.92854579135103!3d26.045608946844023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39496189708a4859:0x52f62a8866820f7!2sSanghar, Sindh, Pakistan!5e0!3m2!1sen!2s!4v1731001523026!5m2!1sen!2s"
            className="w-full h-full rounded-lg border-2 border-gray-200"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
