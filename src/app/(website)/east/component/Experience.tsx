"use client";
import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const experienceData = [
  {
    company: "Qtec Solution Limited",
    title: "Software Engineer",
    date: "Mar 2024 – Jun 2025",
    location: "Dhaka, Bangladesh",
    description: [
      "Designed and implemented scalable, secure backend systems for financial and healthcare applications, including a payment gateway built on Next.js and MongoDB.",
      "Developed and maintained Uganda Microfinance software (UMIS), fixing and extending deployments across Uganda, Zambia, Kenya, and Tanzania (ASP.NET, Razor Pages, SQL Server).",
      "Built JG Healthcare (jghealthcare.com) and Visabee (visabee.com.bd) — production platforms on Next.js, Express.js, MongoDB and Bootstrap.",
      "Collaborated with international teams to deploy systems across multiple regions with an emphasis on data integrity and reliability.",
    ],
  },
  {
    company: "Bimafy Limited",
    title: "Software Engineer (React Native)",
    date: "Oct 2023 – Feb 2024",
    location: "Dhaka, Bangladesh",
    description: [
      "Developed and deployed cross-platform insurance-claims apps for iOS and Android using React Native, Zustand and React Query.",
      "Integrated Google Cloud APIs and built OCR functionality with OpenCV-Python and EasyOCR, exposed via a Flask API.",
      "Resolved complex bugs and led implementation of new features, contributing to a more stable release cycle.",
    ],
  },
  {
    company: "A1DIGI",
    title: "Software Engineer",
    date: "Jun 2023 – Oct 2023",
    location: "Dhaka, Bangladesh",
    description: [
      "Built software on the WhatsApp API with a Node.js backend, Next.js frontend and MongoDB.",
      "Developed a full-stack website using the MERN stack and contributed to mobile development in React Native.",
      "Mentored interns on React.js and Node.js.",
    ],
  },
  {
    company: "Bangla Institute",
    title: "Backend Engineer Intern",
    date: "Dec 2022 – Jun 2023",
    location: "Remote",
    description: [
      "Built backend services and secure authentication systems using Node.js and Express.js.",
      "Designed scalable data models and optimised database performance on MongoDB.",
      "Delivered a companion Android app for Bangla Institute's mobile services.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="experience" title="Professional Experience" />

        <div className="relative mt-16">
          <div
            className="absolute left-[7px] sm:left-1/2 sm:-ml-px top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />
          <div className="space-y-10">
            {experienceData.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* node */}
                <span
                  className="absolute left-0 sm:left-1/2 sm:-ml-[7px] top-1.5 w-[15px] h-[15px] rounded-full flex-shrink-0"
                  style={{ background: "var(--bg)", border: "2px solid var(--accent)" }}
                />

                <div className="hidden sm:block sm:w-1/2" />

                <div
                  className="ml-8 sm:ml-0 sm:w-1/2 rounded-xl p-7"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
                    {experience.title}
                  </h3>
                  <p className="font-mono text-sm mb-3" style={{ color: "var(--accent)" }}>
                    {experience.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-4 text-xs font-mono" style={{ color: "var(--text-faint)" }}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> {experience.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 size={13} /> {experience.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--border-strong)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
