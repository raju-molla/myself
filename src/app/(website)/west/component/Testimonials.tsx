"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Sagir Ahmed",
    title: "Software Engineer Lead at Qtec Solution",
    quote: "Raju is a highly skilled and dedicated software engineer. His problem-solving abilities and commitment to quality are truly commendable. He was a valuable asset to our team.",
    image: "/sag.jpeg",
  },
  {
    name: "MD. Altaf Hossain",
    title: "Senior Software Enginner at Qtec Solution",
    quote: "I had the pleasure of working with Raju on a complex project. His technical expertise, especially in React Native, was outstanding. He's also a great team player.",
    image: "/altaf.jpeg",
  },
  {
    name: "Biprajit Karmakar",
    title: "Software Engineer",
    quote: "Raju consistently delivered high-quality work on time. He's proactive, communicates effectively, and is always willing to go the extra mile. I highly recommend him.",
    image: "/bip.jpeg",
  },
];

const testimonialFadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="min-h-screen py-20 bg-gradient-to-tr from-gray-900 via-purple-900 to-black text-white flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-serif font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
        >
          Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={testimonialFadeIn}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-lg p-8 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition duration-300 hover:scale-105"
                />
              </div>
              <FaQuoteLeft className="text-purple-500 mb-2" size={20} />
              <p className="text-gray-300 italic mb-4">&quot;{testimonial.quote}&quot;</p>
              <FaQuoteRight className="text-purple-500 mt-2 self-end" size={20} />
              <h4 className="text-lg font-semibold text-white mt-4">{testimonial.name}</h4>
              <p className="text-sm text-purple-400">{testimonial.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}