"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormState({
          status: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (response.status === 429) {
        setFormState({
          status: "error",
          message: `Too many requests. Please try again after ${data.retryAfter} seconds.`,
        });
      } else {
        setFormState({
          status: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormState({
        status: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
          LET'S{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            WORK
          </span>{" "}
          <br /> TOGETHER
        </h2>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          Have a project in mind? Let's collaborate and create something
          amazing. Fill out the form below and I'll get back to you soon.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="What is this about?"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              placeholder="Tell me more about your project..."
            />
          </div>

          {/* Status Messages */}
          {formState.message && (
            <div
              className={`p-4 rounded-lg text-sm font-medium ${
                formState.status === "success"
                  ? "bg-green-900/20 border border-green-700 text-green-400"
                  : formState.status === "error"
                    ? "bg-red-900/20 border border-red-700 text-red-400"
                    : "bg-blue-900/20 border border-blue-700 text-blue-400"
              }`}
            >
              {formState.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.status === "loading"}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/50"
          >
            {formState.status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between text-zinc-500 text-sm">
        <p>© 2026 Gaurav Kumar — Python & AI Developer</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
