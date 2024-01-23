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

    if (formData.phone.trim()) {
      newErrors.phone = "Valid phone number is required";
      valid = false;
    } else {
      newErrors.phone = "";
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
    <section id="contact" className="max-w-full mx-auto flex flex-col gap-8">
      <div className="relative flex items-top justify-center min-h-screen sml:items-center sml:pt-0">
        <div className="max-w-full mx-auto sml:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 mdl:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-800 sml:rounded-lg">
                <h1 className="text-4xl sml:text-5xl text-white font-extrabold tracking-tight font-titleFont">
                  Get in touch
                </h1>
                <p className="text-normal text-md sml:text-2xl font-medium text-gray-400 mt-2">
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
                  <div className="ml-4 text-sm sml:text-md tracking-wide font-semibold w-40">
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
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
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
                  <div className="ml-4 text-sm sml:text-md tracking-wide font-semibold w-full">
                    skillzdev@hotmail.com
                  </div>
                </div>
              </div>

              <form
                className="p-6 flex flex-col justify-center"
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
                    className="w-100 mt-2 py-3 px-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 font-semibold focus:border-indigo-500 focus:outline-none text-white"
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-sm">
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
                    className="w-100 mt-2 py-3 px-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 font-semibold focus:border-indigo-500 focus:outline-none text-white"
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-sm">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label className="hidden">Number</label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleInputChange}
                    required
                    placeholder="Telephone Number"
                    className="w-full mt-2 py-3 px-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 font-semibold focus:border-indigo-500 focus:outline-none text-white"
                  />
                  {formErrors.phone && (
                    <span className="text-red-500 text-sm">
                      {formErrors.phone}
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
                    className="w-100 mt-2 py-3 px-3 mb-1 rounded-lg bg-gray-800 border border-gray-700 font-semibold focus:border-hoverColor focus:outline-none text-white"
                  />
                  {formErrors.message && (
                    <span className="text-red-500 text-sm">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="mdl:w-32 font-titleFont border border-textBlue rounded-md text-textBlue tracking-wide hover:bg-hoverColor duration-300 py-3 px-6 mt-3"
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
