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

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
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

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.name.trim()) {
      errors.name = "👤 Please enter your full name";
    } else if (formData.name.trim().length < 2) {
      errors.name = "⚠️ Name must be at least 2 characters long";
    } else if (formData.name.trim().length > 50) {
      errors.name = "⚠️ Name must be less than 50 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "📧 Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "⚠️ Please enter a valid email format (e.g., name@domain.com)";
    }

    if (!formData.subject.trim()) {
      errors.subject = "📝 Please enter a subject for your message";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "⚠️ Subject must be at least 3 characters long";
    } else if (formData.subject.trim().length > 100) {
      errors.subject = "⚠️ Subject must be less than 100 characters";
    }

    if (!formData.message.trim()) {
      errors.message = "💬 Please enter your message";
    } else if (formData.message.trim().length < 10) {
      errors.message = "⚠️ Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 1000) {
      errors.message = "⚠️ Message must be less than 1000 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormState({
        status: "error",
        message: "Please fix the errors above",
      });
      return;
    }

    setFormState({ status: "loading", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormState({
          status: "success",
          message: "✅ Message sent successfully! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFieldErrors({});
      } else {
        setFormState({
          status: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormState({
        status: "error",
        message: "⚠️ An error occurred. Please try again later.",
      });
    }
  };

  const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
  }: {
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      <label className="text-sm font-semibold text-zinc-300 mb-2 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={`w-full bg-zinc-900 border rounded-2xl px-6 py-4 focus:outline-none transition-colors ${
          fieldErrors[name as keyof FieldErrors]
            ? "border-red-500 focus:border-red-400"
            : "border-zinc-800 focus:border-orange-500"
        }`}
      />
      {fieldErrors[name as keyof FieldErrors] && (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
          <p className="text-red-400 text-xs font-medium">
            {fieldErrors[name as keyof FieldErrors]}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <section id="contact" className="w-full py-24">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          LET'S{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            WORK
          </span>{" "}
          <br /> TOGETHER
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Have a project in mind? Let's collaborate and create something
          amazing.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              name="name"
              label="Full Name"
              placeholder="Gaurav Kumar"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              name="email"
              label="Email Address"
              type="email"
              placeholder="gaurav@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <InputField
            name="subject"
            label="Subject"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={handleChange}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-zinc-300">
                Message
              </label>
              <span className={`text-xs font-medium ${
                formData.message.length > 1000 
                  ? 'text-red-400' 
                  : formData.message.length > 800 
                  ? 'text-orange-400' 
                  : 'text-zinc-500'
              }`}>
                {formData.message.length}/1000
              </span>
            </div>
            <textarea
              name="message"
              placeholder="Tell me more about your project..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className={`w-full bg-zinc-900 border rounded-2xl px-6 py-4 focus:outline-none transition-colors resize-none ${
                fieldErrors.message
                  ? "border-red-500 focus:border-red-400"
                  : "border-zinc-800 focus:border-orange-500"
              }`}
            />
            {fieldErrors.message && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                <p className="text-red-400 text-xs font-medium">
                  {fieldErrors.message}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formState.status === "loading"}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-5 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.status === "loading" ? "SENDING..." : "SEND MESSAGE"}
          </button>

          {formState.message && (
            <div
              className={`p-4 rounded-xl text-center text-sm font-medium transition-all ${
                formState.status === "success"
                  ? "bg-green-500/20 border border-green-500/50 text-green-300"
                  : "bg-red-500/20 border border-red-500/50 text-red-300"
              }`}
            >
              {formState.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
