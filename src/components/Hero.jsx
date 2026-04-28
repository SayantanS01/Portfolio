import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolio } from '../context/PortfolioContext';
import './Hero.css';

const Hero = () => {
  const { portfolioData } = usePortfolio();
  const { hero } = portfolioData;
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from(btnRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');

      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section hero-section" ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            {hero.name} <br />
            <span className="text-gradient">{hero.surname}</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            {hero.subtitle}
          </p>
          <div ref={btnRef} className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href={hero.resumeLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Download CV</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
        </div>
        
        <div className="hero-image-wrapper" ref={imageRef}>
          <div className="hero-profile-container">
            <img src={hero.profileImage} alt={`${hero.name} ${hero.surname}`} className="hero-profile-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
