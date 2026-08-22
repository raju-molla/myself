'use client'

import { JSX, useState } from 'react';
import Navbar from './component/Navbar';
import About from '../east/about/page';
import Hero from '../east/hero-section/page';
import Projects from '../east/projects/page';
import Experience from '../east/component/Experience';
import ContactForm from '../east/contact/page';
import Testimonials from './component/Testimonials';
import Skills from './component/Skills';
export type SectionKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'testimonials'
  | 'contact';

const sectionContent: Record<SectionKey, JSX.Element> = {
  home: <Hero />,
  about: <About />,
  projects: <Projects />,
  experience: <Experience />,
  skills: <Skills />,
  testimonials: <Testimonials />,
  contact: <ContactForm />,
};

export default function TamplateTwo() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');



  return (
    <div className="flex">
      <Navbar onSelect={setActiveSection} />
      <div className="ml-64 w-full min-h-screen ">
       
        <div>{sectionContent[activeSection]}</div>
      </div>
    </div>
  );
}
