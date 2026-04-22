import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    id: 1,
    title: 'Online Jewellery Shopping System',
    description: 'Developed full-stack e-commerce platform for jewellery shopping. Implemented secure authentication and Stripe payment gateway.',
    tech: ['TypeScript', 'Node.js', 'Kinde', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/SayantanS01/jewellery_shopping-main',
    live: '#'
  },
  {
    id: 2,
    title: 'Social Network Analysis for Criminal Networks',
    description: 'Modeled criminal networks using signed graphs. Computed Centrality and designed IM-Vector for influence maximization.',
    tech: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Scholarly Quiz',
    description: 'A responsive Next.js application for creating and taking scholarly quizzes.',
    tech: ['Next.js', 'TypeScript', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/SayantanS01/scholarly-quiz',
    live: 'https://scholarly-quiz.vercel.app/'
  },
  {
    id: 4,
    title: 'YT Play',
    description: 'A YouTube media utility built with Next.js, featuring a clean UI and Prisma database integration.',
    tech: ['Next.js', 'TypeScript', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/SayantanS01/yt-play',
    live: 'https://yt-play-amber.vercel.app/'
  },
  {
    id: 5,
    title: 'Love Con',
    description: 'An interactive web platform built with Next.js and modern styling.',
    tech: ['Next.js', 'TypeScript', 'CSS'],
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/SayantanS01/love-con',
    live: 'https://love-con.vercel.app/'
  }
];

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={projectsRef}>
      <div className="container">
        <h2 className="section-title animate-up">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        
        <div className="projects-grid">
          {projectData.map((project) => (
            <div key={project.id} className="project-card glass-panel">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <Code size={24} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
