import React from 'react';
import Navbar from '../../components/home/Navbar';
import Hero from '../../components/home/Hero';
import Features1 from '../../components/home/Features1';
import CTA from '../../components/home/CTA';
import Features2 from '../../components/home/Features2';
import Pricing from '../../components/home/Pricing';
import Steps from '../../components/home/Steps';
import Testimonial from '../../components/home/Testimonial';
import Contact from '../../components/home/Contact';
import Footer from '../../components/home/Footer';
import './Homepage.css';

function Homepage() {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <Features1 />
      <CTA />
      <Features2 />
      <Pricing />
      <Steps />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Homepage;
