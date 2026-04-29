import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './Reviews.css';

const Reviews = () => {
  const { portfolioData } = usePortfolio();
  const reviews = portfolioData.reviews || [];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubmitReview = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.target);
    
    // Add access key and custom subject
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Client Review Submission - Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Review Submitted Successfully! It will be posted after approval.");
        setStatus("success");
        event.target.reset();
        
        setTimeout(() => {
          setStatus("idle");
          setResult("");
          setIsFormOpen(false);
        }, 5000);
      } else {
        setResult(data.message);
        setStatus("idle");
      }
    } catch (error) {
      setResult("Something went wrong!");
      setStatus("idle");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <div className="reviews-header-container">
          <h2 className="section-title">Client <span className="text-gradient">Reviews</span></h2>
          <button className="btn btn-outline" onClick={() => setIsFormOpen(!isFormOpen)}>
            {isFormOpen ? 'Close Form' : 'Leave a Review'}
          </button>
        </div>
        
        {isFormOpen && (
          <div className="review-form-container glass-panel">
            <h3>Submit Your Review</h3>
            <p>Your review will be sent directly to me for approval before appearing on the site.</p>
            <form className="review-form" onSubmit={onSubmitReview} encType="multipart/form-data">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reviewer-name">Your Name</label>
                  <input type="text" id="reviewer-name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="reviewer-role">Your Role / Company</label>
                  <input type="text" id="reviewer-role" name="role" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="project-name">Project Name</label>
                  <input type="text" id="project-name" name="project" required />
                </div>
                <div className="form-group">
                  <label htmlFor="project-link">Project Link (Optional)</label>
                  <input type="url" id="project-link" name="link" placeholder="https://..." />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reviewer-photo">Your Photo (Optional)</label>
                  <input type="file" id="reviewer-photo" name="attachment" accept="image/*" />
                </div>
                <div className="form-group" style={{ flex: '0.5' }}>
                  <label htmlFor="rating">Rating (1-5)</label>
                  <input type="number" id="rating" name="rating" min="1" max="5" defaultValue="5" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="review-text">Review</label>
                <textarea id="review-text" name="review" rows="4" required></textarea>
              </div>
              
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? "Submitting..." : status === "success" ? "Submitted!" : "Submit Review"}
              </button>
              
              {result && (
                <p style={{ marginTop: '10px', color: status === 'success' ? '#4ade80' : '#ef4444' }}>
                  {result}
                </p>
              )}
            </form>
          </div>
        )}
        
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-card glass-panel">
                <div className="review-header">
                  <div className="reviewer-photo">
                    <img src={review.photo} alt={review.name} />
                  </div>
                  <div className="reviewer-info">
                    <h3>{review.name}</h3>
                    <p>{review.role}</p>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                
                <div className="review-body">
                  <p className="review-text">"{review.text}"</p>
                </div>
                
                <div className="review-footer">
                  <span className="project-label">Project:</span>
                  <a href={review.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    {review.project} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-reviews glass-panel" style={{ padding: '40px', textAlign: 'center', borderRadius: '4px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No reviews yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
