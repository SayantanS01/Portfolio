import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, RefreshCw, Eye, EyeOff, Plus, Trash2, LogOut } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { portfolioData, updatePortfolioData, resetToDefault } = usePortfolio();
  const [activeTab, setActiveTab] = useState('projects');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for now
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleProjectToggle = (id) => {
    const newProjects = portfolioData.projects.map(p => 
      p.id === id ? { ...p, isVisible: !p.isVisible } : p
    );
    updatePortfolioData({ ...portfolioData, projects: newProjects });
  };

  const handleHeroChange = (field, value) => {
    updatePortfolioData({
      ...portfolioData,
      hero: { ...portfolioData.hero, [field]: value }
    });
  };

  const handleAboutChange = (field, value) => {
    updatePortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, [field]: value }
    });
  };

  const handleAddSkill = (skill) => {
    if (skill && !portfolioData.about.skills.includes(skill)) {
      updatePortfolioData({
        ...portfolioData,
        about: { ...portfolioData.about, skills: [...portfolioData.about.skills, skill] }
      });
    }
  };

  const handleRemoveSkill = (skill) => {
    updatePortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, skills: portfolioData.about.skills.filter(s => s !== skill) }
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-card glass-panel">
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="hint">Hint: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav glass-panel">
        <div className="admin-nav-header">
          <h2>Dashboard</h2>
          <button onClick={() => setIsLoggedIn(false)} className="btn-icon" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
        <div className="admin-nav-links">
          <button 
            className={activeTab === 'projects' ? 'active' : ''} 
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'skills' ? 'active' : ''} 
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button 
            className={activeTab === 'content' ? 'active' : ''} 
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
        </div>
        <div className="admin-actions">
          <button onClick={resetToDefault} className="btn btn-outline btn-sm">
            <RefreshCw size={14} /> Reset Defaults
          </button>
        </div>
      </nav>

      <main className="admin-main">
        {activeTab === 'projects' && (
          <div className="admin-section animate-fade-in">
            <h3>Manage Projects</h3>
            <div className="admin-projects-list">
              {portfolioData.projects.map(project => (
                <div key={project.id} className="admin-project-item glass-panel">
                  <div className="project-preview-info">
                    <img src={project.image} alt={project.title} className="mini-thumb" />
                    <div>
                      <h4>{project.title}</h4>
                      <p className="tech-list">{project.tech.join(', ')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleProjectToggle(project.id)}
                    className={`toggle-btn ${project.isVisible ? 'visible' : 'hidden'}`}
                  >
                    {project.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                    <span>{project.isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="admin-section animate-fade-in">
            <h3>Manage Skills</h3>
            <div className="add-skill-form">
              <input 
                type="text" 
                placeholder="New Skill..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="admin-input"
              />
            </div>
            <div className="skills-grid-admin">
              {portfolioData.about.skills.map(skill => (
                <div key={skill} className="skill-tag-admin">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)}><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="admin-section animate-fade-in">
            <h3>Site Content</h3>
            <div className="content-form glass-panel">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  value={portfolioData.hero.name} 
                  onChange={(e) => handleHeroChange('name', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  value={portfolioData.hero.surname} 
                  onChange={(e) => handleHeroChange('surname', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="form-group">
                <label>Hero Subtitle</label>
                <textarea 
                  value={portfolioData.hero.subtitle} 
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="admin-input"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>About Description</label>
                <textarea 
                  value={portfolioData.about.description} 
                  onChange={(e) => handleAboutChange('description', e.target.value)}
                  className="admin-input"
                  rows="5"
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <div className="admin-footer-info">
        <p>Changes are saved automatically to your local browser.</p>
      </div>
    </div>
  );
};

export default Admin;
