import React from 'react'
import { Hero } from './Hero';
import Navbar from './Navbar';
import Food from './Food'
import Footer from './Footer';
import About from './About';
import { Element, scroller } from 'react-scroll';

function Home() {
  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };
  return (
    <div>
      <Navbar scrollToSection={scrollToSection} />
      <Element name="hero">
        <Hero />
      </Element>

      <Element name="food">
        <Food />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Footer />
    </div>
  );
  // return (
  //   <div>
  //     <Navbar />
  //     <Hero />
  //     <Food />
  //     <About />
  //     <Footer />
  //   </div>
  // )
}

export default Home