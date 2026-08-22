"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const name = "Raju Molla".split("");

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-white text-black flex flex-col md:flex-row justify-center items-center px-8 py-16 text-center md:text-left w-full gap-12">
      {/* Left Side: Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-8 mt-6 md:mt-0"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold font-serif tracking-tight flex flex-wrap">
          Hi, I&apos;m&nbsp;
          {name.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <p className="max-w-xl text-lg sm:text-xl leading-relaxed">
          Full-Stack Software Engineer || .Net Developer <br /> Competitive Programmer || Mobile App (React Native)
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <button onClick={() => smoothScrollTo("projects")} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold shadow-lg">
            View Projects
          </button>

          <button onClick={() => smoothScrollTo("contact")} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold shadow-lg">
            Contact Me
          </button>

          <a href="/raju_molla_updated.pdf" download className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold shadow-lg">
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Right Side: Competitive Programming */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="md:w-1/2 max-w-xl text-left space-y-4"
      >
        <h2 className="text-3xl font-bold mb-4 border-b-2 inline-block">
          Competitive Programming
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>ICPC Dhaka Regional Contest 2023</li>
          <li>CEFALO SUST Inter-University Programming Contest (2023): Participant</li>
          <li>EU 38th Intra Faculty Programming Contest (2022) - Champion</li>
          <li>EU 37th Intra Faculty Programming Contest (2022) - Champion</li>
          <li>BUET Inter-University Programming Contest 2022</li>
          <li>EU 36th Intra Faculty Programming Contest (2022) - 1st Runner Up</li>
          <li>ICPC Preliminary Programming Contest 2021</li>
          <li>Intra Programming Contest 2021 (EU-34th) - 6th Place</li>
          <li>Intra Programming Contest 2021 (EU-33rd) - 7th Place</li>
          <li>Inter Programming Contest 2019 (Varendra University) - 36th Place</li>
          <li>Intra Programming Contest 2019 (EU) - 9th Place</li>
        </ul>
      </motion.div>
    </section>
  );
}