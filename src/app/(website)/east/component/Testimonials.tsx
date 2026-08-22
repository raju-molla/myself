"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const testimonialsData = [
  {
    name: "Sagir Ahmed",
    title: "Software Engineer Lead at Qtec Solution",
    quote:
      "Raju is a highly skilled and dedicated software engineer. His problem-solving abilities and commitment to quality are truly commendable. He was a valuable asset to our team.",
    image: "/sag.jpeg",
  },
  {
    name: "MD. Altaf Hossain",
    title: "Senior Software Engineer at Qtec Solution",
    quote:
      "I had the pleasure of working with Raju on a complex project. His technical expertise, especially in React Native, was outstanding. He's also a great team player.",
    image: "/altaf.jpeg",
  },
  {
    name: "Biprajit Karmakar",
    title: "Software Engineer",
    quote:
      "Raju consistently delivered high-quality work on time. He's proactive, communicates effectively, and is always willing to go the extra mile. I highly recommend him.",
    image: "/bip.jpeg",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="testimonials" title="What colleagues say" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl p-7 flex flex-col"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Quote size={20} style={{ color: "var(--accent)" }} className="mb-4" />
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-muted)" }}>
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={testimonial.image} alt={testimonial.name} fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{testimonial.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
