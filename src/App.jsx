import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Cloud, ShieldCheck, Boxes, Terminal, Server, Activity, Network, FileText } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './Scene.jsx';

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: 'Sayantan Sarkar',
  email: 'hi2sayantan@gmail.com',
  phone: '+91 9163307990',
  location: 'Bengaluru, Karnataka, India',
  github: 'https://github.com/SayantanS01',
  linkedin: 'https://www.linkedin.com/in/sayantan-sarkar-3a544b269/',
  linkedinProjects: 'https://www.linkedin.com/in/sayantan-sarkar-3a544b269/details/projects/',
  resume: '/resume.pdf'
};

const projects = [
  {
    number: '01',
    type: 'LINUX · CLOUD INFRASTRUCTURE',
    title: 'AWS Local Package Management Server',
    description: 'Designed a private RPM/YUM repository on Amazon Linux 2023 so EC2 clients in the same VPC can securely install packages over private networking, with automated metadata refresh and failure validation.',
    tags: ['AWS EC2', 'VPC', 'Amazon Linux 2023', 'RPM / DNF', 'Apache', 'Bash'],
    icon: <Server size={22} />,
    link: 'https://lnkd.in/p/gau89uJE',
    linkLabel: 'Read project write-up'
  },
  {
    number: '02',
    type: 'OBSERVABILITY · SERVERLESS',
    title: 'Serverless E-Commerce Observability',
    description: 'Designed an end-to-end monitoring and alerting approach for a serverless e-commerce checkout microservice, focusing on operational visibility across the application workflow.',
    tags: ['AWS Lambda', 'CloudWatch', 'Observability', 'Monitoring', 'Alerting'],
    icon: <Activity size={22} />,
    link: profile.linkedinProjects,
    linkLabel: 'View project details'
  },
  {
    number: '03',
    type: 'LINUX SECURITY · WEB SERVERS',
    title: 'Secure Apache Web Server on AWS EC2',
    description: 'Deployed Apache on RHEL 9 with SELinux enforcing, persistent file contexts, firewalld rules, HTTPS redirection, and TLS 1.2/1.3. Tested security controls and reviewed SELinux AVC denials.',
    tags: ['EC2', 'RHEL 9', 'SELinux', 'Apache', 'firewalld', 'OpenSSL', 'TLS'],
    icon: <ShieldCheck size={22} />,
    link: 'https://lnkd.in/p/guHtWN-C',
    linkLabel: 'Read project write-up'
  },
  {
    number: '04',
    type: 'CLOUD MONITORING',
    title: 'AWS Monitoring & Private Network Connectivity',
    description: 'Configured CloudWatch Agent metrics and log collection, CPU/disk alarms, and practised private-instance connectivity with bastion access, VPC Peering, Transit Gateway, and Client VPN.',
    tags: ['CloudWatch', 'EC2', 'VPC', 'Transit Gateway', 'Client VPN', 'AWS CLI'],
    icon: <Cloud size={22} />,
    link: profile.linkedinProjects,
    linkLabel: 'View project details'
  },
  {
    number: '05',
    type: 'RESEARCH · NETWORK SCIENCE',
    title: 'Community-Aware Criminal Network Analysis',
    description: 'Analyzed signed directed social networks with degree and betweenness centrality, composite influence/attack scoring, Louvain community detection, and structural disruption experiments on the Epinions dataset.',
    tags: ['Python', 'NetworkX', 'Pandas', 'NumPy', 'Louvain'],
    icon: <Network size={22} />,
    link: profile.github,
    linkLabel: 'Explore GitHub'
  }
];

const skillGroups = [
  { name: 'AWS & Cloud', detail: 'EC2 · VPC · IAM · S3 · EBS · Lambda · CloudWatch · Transit Gateway · Client VPN', level: 'HANDS-ON' },
  { name: 'Observability', detail: 'CloudWatch Agent · Metrics · Log collection · Dashboards · Alarms · Troubleshooting', level: 'HANDS-ON' },
  { name: 'Linux & Security', detail: 'Amazon Linux · Ubuntu · RHEL 9 · SELinux · Apache · firewalld · OpenSSL / TLS', level: 'HANDS-ON' },
  { name: 'Networking', detail: 'IPv4 / CIDR · Subnets · Route tables · Security groups · DHCP · VPN · Bastion hosts', level: 'HANDS-ON' },
  { name: 'Automation & Code', detail: 'AWS CLI · Bash · Python · Java · C · SQL · JavaScript · Git / GitHub', level: 'FOUNDATION' }
];

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="topbar">
      <a className="brand" href="#home" onClick={close}><span className="brand-mark">S.</span><span>SAYANTAN SARKAR</span></a>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        <a href="#about" onClick={close}>About</a>
        <a href="#work" onClick={close}>Projects</a>
        <a href="#skills" onClick={close}>Toolkit</a>
        <a className="nav-contact" href="#contact" onClick={close}>Let’s connect <ArrowUpRight size={14} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </header>
  );
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" /><span>{children}</span></div>;
}

function App() {
  const progress = useRef(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progress.current = p;
      setScrollPercent(Math.round(p * 100));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        });
      });
      gsap.fromTo('.hero-copy > *', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15
      });
    });
    return () => {
      window.removeEventListener('scroll', update);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollPercent / 100})` }} />
      <Header />
      <Scene progress={progress} />
      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> CLOUD ENGINEER · AXCESS.IO · BENGALURU</div>
            <h1>Engineering<br /><span className="outline-text">cloud</span> that’s<br />built to last<span className="lime-dot">.</span></h1>
            <p className="hero-description">I’m Sayantan — a Cloud Engineer working across monitoring, Linux systems, cloud networking, and security. I build hands-on AWS projects to make infrastructure more observable, dependable, and secure.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore projects <ArrowUpRight size={16} /></a>
              <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">View CV <FileText size={14} /></a>
            </div>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a>
            </div>
          </div>
          <div className="hero-side-note"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
          <div className="hero-bottom">
            <span>01 / CLOUD ENGINEERING</span>
            <span className="hero-coordinate">AWS · LINUX · OBSERVABILITY · SECURITY</span>
            <span>SCROLL-DRIVEN EXPERIENCE</span>
          </div>
          <div className="orb-caption"><span className="caption-dot" /> INFRASTRUCTURE IN MOTION <span className="caption-rule" /> 3D / 01</div>
        </section>

        <section className="about section-shell section-pad" id="about">
          <SectionLabel number="01">PROFILE</SectionLabel>
          <div className="about-grid">
            <div className="about-heading reveal">
              <div className="profile-photo-wrap"><img src="/profile.jpg" alt="Sayantan Sarkar" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
              <h2>Curious by nature.<br /><span className="muted">Cloud engineer by practice.</span></h2>
            </div>
            <div className="about-body reveal">
              <p>I work in a Monitoring Service team at Axcess.io, building practical skills around AWS monitoring, CloudWatch Agent configuration, system metrics and log collection, alarms, and infrastructure troubleshooting.</p>
              <p>Outside day-to-day learning, I document hands-on builds spanning private package repositories, secure Linux web servers, serverless observability, and private AWS networking. I value repeatable validation, clear documentation, and security-first infrastructure.</p>
              <div className="about-stats">
                <div><strong>AWS</strong><span>Cloud infrastructure</span></div>
                <div><strong>LINUX</strong><span>Systems & security</span></div>
                <div><strong>MONITOR</strong><span>Observe & troubleshoot</span></div>
              </div>
            </div>
          </div>
          <div className="education-strip reveal">
            <div><span>EDUCATION</span><strong>B.Tech · Computer Science & Engineering</strong><small>Techno Main Salt Lake · 2023–2026 · CGPA 8.07/10</small></div>
            <div><span>PREVIOUS QUALIFICATION</span><strong>Diploma · Electrical Engineering</strong><small>APC Ray Polytechnic · 2020–2023 · CGPA 8.9/10</small></div>
          </div>
        </section>

        <section className="work section-shell section-pad" id="work">
          <SectionLabel number="02">SELECTED PROJECTS</SectionLabel>
          <div className="section-heading reveal"><h2>Built hands-on.<br /><span className="muted">Validated in practice.</span></h2><p>Cloud infrastructure, Linux security, monitoring, and research projects. Open each write-up for implementation details and validation notes.</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <div className="project-number">{project.number}</div>
                <div className="project-icon">{project.icon}</div>
                <div className="project-content">
                  <div className="project-type">{project.type}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a className="project-read-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={13}/></a>
                </div>
                <a className="project-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight /></a>
              </article>
            ))}
          </div>
          <div className="all-projects-link"><span>MORE BUILDS & DOCUMENTATION</span><a href={profile.linkedinProjects} target="_blank" rel="noreferrer">Browse LinkedIn projects <ArrowUpRight size={14}/></a></div>
        </section>

        <section className="skills section-shell section-pad" id="skills">
          <SectionLabel number="03">TECHNICAL TOOLKIT</SectionLabel>
          <div className="skills-grid">
            <div className="skills-intro reveal"><h2>Strong fundamentals.<br /><span className="lime-text">Practical execution.</span></h2><p>Tools are useful when you can configure them, troubleshoot them, and explain the trade-offs.</p><div className="terminal-card"><div className="terminal-top"><span /><span /><span /><small>terminal — bash</small></div><code><span>$</span> whoami<br />cloud-engineer<br /><span>$</span> focus --list<br />monitoring · networking<br />linux · security<span className="cursor">_</span></code></div></div>
            <div className="skill-list reveal">{skillGroups.map((skill, i) => <div className="skill-row" key={skill.name}><span className="skill-index">0{i + 1}</span><div><h3>{skill.name}</h3><p>{skill.detail}</p></div><span className="skill-level">{skill.level}</span></div>)}</div>
          </div>
          <div className="certification-row reveal"><span>CERTIFICATIONS & LEARNING</span><p>AWS Cloud Foundations (2025) · Python Fundamentals Bootcamp (2024) · Preparing for AWS Certified Cloud Practitioner</p></div>
        </section>

        <section className="contact section-shell section-pad" id="contact">
          <SectionLabel number="04">CONTACT</SectionLabel>
          <div className="contact-panel reveal">
            <div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" />
            <div className="contact-content"><span className="eyebrow"><span className="status-dot" /> OPEN TO CONNECT & COLLABORATE</span><h2>Let’s build<br />something <span className="lime-text">reliable.</span></h2><p>Interested in cloud operations, infrastructure monitoring, Linux security, or building something together? Let’s connect.</p><a className="button button-primary" href={`mailto:${profile.email}`}>Say hello <Mail size={16} /></a><div className="contact-details"><span>{profile.email}</span><span>{profile.location}</span></div></div>
            <div className="contact-mark"><Terminal size={58} strokeWidth={1} /><span>READY WHEN YOU ARE_</span></div>
          </div>
        </section>
      </main>
      <footer className="footer section-shell"><a className="brand" href="#home"><span className="brand-mark">S.</span><span>SAYANTAN SARKAR</span></a><span>DESIGNED TO MOVE · © {new Date().getFullYear()}</span><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a></div></footer>
    </>
  );
}

export default App;