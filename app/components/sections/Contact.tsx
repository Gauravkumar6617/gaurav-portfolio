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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormState({ status: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState({ status: "error", message: "Failed to send message." });
      }
    } catch (error) {
      setFormState({ status: "error", message: "An error occurred." });
    }
  };

  return (
    <section id="contact" className="w-full py-24">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">WORK</span> <br /> TOGETHER
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Have a project in mind? Let's collaborate and create something amazing.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={formState.status === "loading"}
            className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
          >
            {formState.status === "loading" ? "SENDING..." : "SEND MESSAGE"}
          </button>
          {formState.message && (
             <p className={`text-center text-sm ${formState.status === "success" ? "text-green-400" : "text-red-400"}`}>
               {formState.message}
             </p>
          )}
        </form>
      </div>
    </section>
  );
}