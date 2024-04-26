"use client";
import { useState } from "react";
import Modal from "./Modal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Valid email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else {
      newErrors.message = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      await fetch("https://getform.io/f/2128cedd-9e39-41fa-bbdf-ab44725490e9", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      setIsConfirmationOpen(true);
    }
  };
  return (
    <section id="contact" className="flex flex-col max-w-full gap-8 mx-auto">
      <div className="relative flex justify-center min-h-screen items-top sml:items-center sml:pt-0">
        <div className="max-w-full mx-auto sml:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 mdl:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-800 sml:rounded-lg">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sml:text-5xl font-titleFont">
                  Get in touch
                </h1>
                <p className="mt-2 font-medium text-gray-400 text-normal text-md sml:text-2xl">
                  Fill in the form to start a conversation
                </p>

                <div className="flex items-center mt-8 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="w-40 ml-4 text-sm font-semibold tracking-wide sml:text-md">
                    Tlemcen, 13016, Algeria
                  </div>
                </div>

                <div className="flex items-center mt-4 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="w-40 ml-4 font-semibold tracking-wide text-md">
                    +213 5606900167
                  </div>
                </div>

                <div className="flex items-center mt-2 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="w-full ml-4 text-sm font-semibold tracking-wide sml:text-md">
                    skillzdev@hotmail.com
                  </div>
                </div>
              </div>

              <form
                className="flex flex-col justify-center p-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <label className="hidden">Full Name *</label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                    className="px-3 py-3 mt-2 mb-1 font-semibold text-white bg-gray-800 border border-gray-700 rounded-lg w-100 focus:border-indigo-500 focus:outline-none"
                  />
                  {formErrors.name && (
                    <span className="text-sm text-red-500">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label className="hidden">Email *</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="px-3 py-3 mt-2 mb-1 font-semibold text-white bg-gray-800 border border-gray-700 rounded-lg w-100 focus:border-indigo-500 focus:outline-none"
                  />
                  {formErrors.email && (
                    <span className="text-sm text-red-500">
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-2">
                  <label className="hidden">Message *</label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="px-3 py-3 mt-2 mb-1 font-semibold text-white bg-gray-800 border border-gray-700 rounded-lg w-100 focus:border-hoverColor focus:outline-none"
                  />
                  {formErrors.message && (
                    <span className="text-sm text-red-500">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 mt-3 tracking-wide duration-300 border rounded-md mdl:w-32 font-titleFont border-textBlue text-textBlue hover:bg-hoverColor"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isConfirmationOpen && (
        <Modal open={isConfirmationOpen} setOpen={setIsConfirmationOpen} />
      )}
    </section>
  );
};

export default Contact;
