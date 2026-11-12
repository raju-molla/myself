import React from 'react'
import Navbar from './navbar/page'
import Hero from './hero-section/page'
import PortfolioSections from './component/PortfolioSections'
import Footer from './component/Footer'

function TampleteOne() {
  return (
    <div className="portfolio-theme">
     <Navbar/>
     <Hero />
     <PortfolioSections />
     <Footer />
    </div>

  )
}

export default TampleteOne
