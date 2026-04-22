import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.animate-up');
      
      elements.forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about-section" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title animate-up">
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="about-content">
          <div className="about-text glass-panel animate-up">
            <p>
              A highly motivated and adaptable Computer Science graduate with a strong foundation in software development, data structures, and algorithms. Proficient in languages such as Python and Java, with hands-on experience in building web applications through academic projects. Possesses a strong aptitude for mastering new technologies and is eager to apply this skill to become a valuable asset to your team.
            </p>
          </div>
          
          <div className="skills-container glass-panel animate-up">
            <h3>Core Skills</h3>
            <div className="skills-grid">
              {['Python', 'Java', 'C', 'SQL', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Tailwind CSS'].map((skill) => (
                <div key={skill} className="skill-tag">{skill}</div>
              ))}
            </div>
          </div>

          <div className="resume-container glass-panel animate-up" style={{ marginTop: '30px', padding: '40px' }}>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', color: 'var(--text-primary)', fontFamily: 'Syncopate, sans-serif' }}>My Resume</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1rem', lineHeight: '1.6' }}>
              Want to know more about my experience and academic background? You can view or download my full curriculum vitae.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">View / Download CV</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
