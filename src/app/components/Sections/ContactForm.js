"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Message sent successfully!");
      e.target.reset();
      setTimeout(() => {
        setStatus("");
      }, 2000);
    } else {
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <h2 className="text-4xl font-extrabold text-red-600 text-center mb-8">
          Contact Me
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 space-y-6"
        >
          {/* Web3Forms Access Key */}
          <input
            type="hidden"
            name="access_key"
            value="c5bf9310-ebff-46b8-ba1c-4537352ea2bf"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-red-600 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-red-600 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
              placeholder="abcd@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-red-600 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center text-pink-600 font-medium mt-4">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
