"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../component/SectionHeading";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await emailjs.send(
        "service_idqu1yq",
        "template_c3rugmf",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "KZYImwYzRAHoBWaew"
      );

      if (result.status === 200) {
        setSubmissionResult("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionResult("error");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmissionResult("error");
    }

    setIsSubmitting(false);
  };

  const fieldClass = (hasError: string) =>
    `w-full py-3.5 pl-12 pr-4 text-[15px] rounded-lg outline-none transition ${
      hasError ? "" : ""
    }`;

  return (
    <section
      id="contact"
      className="w-full py-24 px-6"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="max-w-xl mx-auto">
        <SectionHeading eyebrow="contact" title="Let's connect" />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-10 mt-14"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="relative mb-5">
            <User className="absolute left-4 top-3.5" size={20} style={{ color: "var(--text-faint)" }} />
            <input
              type="text"
              name="name"
              className={fieldClass(errors.name)}
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text)",
                border: `1px solid ${errors.name ? "#f2555a" : "var(--border-strong)"}`,
              }}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-xs mt-1.5" style={{ color: "#f2555a" }}>{errors.name}</p>}
          </div>

          <div className="relative mb-5">
            <Mail className="absolute left-4 top-3.5" size={20} style={{ color: "var(--text-faint)" }} />
            <input
              type="email"
              name="email"
              className={fieldClass(errors.email)}
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text)",
                border: `1px solid ${errors.email ? "#f2555a" : "var(--border-strong)"}`,
              }}
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-xs mt-1.5" style={{ color: "#f2555a" }}>{errors.email}</p>}
          </div>

          <div className="relative mb-6">
            <MessageSquare className="absolute left-4 top-3.5" size={20} style={{ color: "var(--text-faint)" }} />
            <textarea
              name="message"
              rows={5}
              className={`${fieldClass(errors.message)} resize-none`}
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text)",
                border: `1px solid ${errors.message ? "#f2555a" : "var(--border-strong)"}`,
              }}
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-xs mt-1.5" style={{ color: "#f2555a" }}>{errors.message}</p>}
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
            style={{ background: "var(--accent)", color: "#04120d" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </motion.button>

          {submissionResult === "success" && (
            <p className="mt-5 text-sm font-medium text-center" style={{ color: "var(--accent-strong)" }}>
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {submissionResult === "error" && (
            <p className="mt-5 text-sm font-medium text-center" style={{ color: "#f2555a" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
