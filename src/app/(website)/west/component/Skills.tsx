"use client";
import { motion } from "framer-motion";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const skillsData = [
  {
    category: "Frontend",
    items: ["React js", "Next js", "React Native (Android & iOS)", "Bootstrap", "Tailwind CSS", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node js", "Express.js", "Asp.net core", "Razor Pages", "Python"],
  },
  {
    category: "Languages",
    items: ["Javascript", "TypeScript", "C", "C++", "C#", "Python"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "SQL"],
  },
  {
    category: "State Management",
    items: ["Zustand", "Redux"],
  },
  {
    category: "Other",
    items: ["Data Structure and Algorithm", "Problem Solving"],
  },
];

const categoryFadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

const skillFadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const iconAnimation = {
  initial: { scale: 0.7, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl font-serif font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillsData.map((skillCategory, index) => (
            <motion.div
              key={index}
              variants={categoryFadeIn}
              className="bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.03] transform transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                {skillCategory.category}
              </h3>
              <ul className="list-none space-y-3">
                {skillCategory.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    variants={skillFadeIn}
                    className="flex items-center text-gray-200 font-medium"
                    style={{ transitionDelay: `${skillIndex * 0.1}s` }}
                  >
                    <motion.div
                      variants={iconAnimation}
                      className="mr-3 text-pink-400"
                    >
                      <HiOutlineBadgeCheck size={22} />
                    </motion.div>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
