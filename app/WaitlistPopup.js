import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const WaitlistPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const [submissionState, setSubmissionState] = useState(null); // null, 'success', or 'error'
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = useCallback((token) => {
    setCaptchaToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionState(null);

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "20cbe309-ded1-4c80-914b-b5e0b455f64d",
          name,
          email,
          message: `User Type: ${userType}\nMessage: ${message}`,
          "g-recaptcha-response": captchaToken,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionState("success");
        setTimeout(() => {
          onClose();
          setSubmissionState(null);
        }, 2000);
      } else {
        setSubmissionState("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionState("error");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#A8DADC] rounded-lg p-8 max-w-md w-full relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#1D3557] mb-4">
          Join the Waitlist
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="access_key"
            value="20cbe309-ded1-4c80-914b-b5e0b455f64d"
          />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
          />

          <div className="mb-4">
            <label className="block text-[#1D3557] mb-2">I am a:</label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  userType === "creator"
                    ? "bg-[#E63946] text-white"
                    : "bg-white text-[#1D3557]"
                }`}
                onClick={() => setUserType("creator")}
              >
                Creator
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  userType === "consumer"
                    ? "bg-[#E63946] text-white"
                    : "bg-white text-[#1D3557]"
                }`}
                onClick={() => setUserType("consumer")}
              >
                Consumer
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#1D3557] mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#457B9D] rounded focus:outline-none focus:border-[#E63946] bg-white text-[#1D3557]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#1D3557] mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#457B9D] rounded focus:outline-none focus:border-[#E63946] bg-white text-[#1D3557]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-[#1D3557] mb-2">
              Message (optional):
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-[#457B9D] rounded focus:outline-none focus:border-[#E63946] bg-white text-[#1D3557]"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6LfBjUgqAAAAAHOwY9HXarY1w-RrVf6ErUc3kA3B"
              onChange={handleCaptchaChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-[#1D3557] hover:text-[#457B9D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E63946] text-white rounded hover:bg-[#c81d2a]"
            >
              Join Waitlist
            </button>
          </div>
        </form>

        <AnimatePresence>
          {submissionState === "success" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <p className="text-white text-2xl font-bold">
                Successfully joined the waitlist!
              </p>
            </motion.div>
          )}
          {submissionState === "error" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-90 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <p className="text-white text-2xl font-bold">
                Error submitting form. Please try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistPopup;
