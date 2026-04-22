import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Code, Briefcase, MessageCircle, Check } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.target);

    // Provide placeholder, user needs to get key
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setStatus("success");
        event.target.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setResult("");
        }, 5000);
      } else {
        console.log("Error", data);
        setResult(data.message);
        setStatus("idle");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong!");
      setStatus("idle");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section contact-section" ref={contactRef}>
      <div className="container">
        <div className="contact-wrapper glass-panel contact-animate">
          <div className="contact-info">
            <h2 className="contact-title">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="contact-desc">
              Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="contact-links">
              <a href="mailto:hi2sayantan@gmail.com" className="contact-link">
                <Mail /> hi2sayantan@gmail.com
              </a>
              <p className="contact-desc" style={{marginTop: '10px', fontSize: '1rem'}}>
                +91 9163307990<br/>
                Kolkata-700127, West Bengal
              </p>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon"><Code /></a>
              <a href="#" className="social-icon"><Briefcase /></a>
              <a href="#" className="social-icon"><MessageCircle /></a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Sayantan Sarkar" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
            </div>
            
            {/* Honeypot for spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={status === "submitting" || status === "success"}
              style={{ display: 'flex', gap: '10px' }}
            >
              {status === "submitting" ? "Sending..." : status === "success" ? <><Check size={18} /> Sent!</> : "Send Message"}
            </button>
            
            {result && (
              <p style={{ marginTop: '10px', color: status === 'success' ? '#4ade80' : '#ef4444', fontSize: '0.9rem' }}>
                {result}
              </p>
            )}
          </form>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sayantan Sarkar. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
