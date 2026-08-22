import React from 'react'
import Navbar from './navbar/page'
import Hero from './hero-section/page'
import About from './about/page'
import Research from './component/Research'
import Skills from './component/Skills'
import Projects from './projects/page'
import Experience from './component/Experience'
import Achievements from './component/Achievements'
import Testimonials from './component/Testimonials'
import ContactForm from './contact/page'
import Footer from './component/Footer'

function TampleteOne() {
  return (
    <>
     <Navbar/>
     <Hero />
     <About/>
     <Research />
     <Skills />
     <Projects />
     <Experience />
     <Achievements />
     <Testimonials />
     <ContactForm />
     <Footer />
    </>

  )
}

export default TampleteOne
