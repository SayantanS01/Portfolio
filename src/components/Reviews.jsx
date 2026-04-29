import React from 'react';
import './Reviews.css';

const Reviews = () => {
  // Empty array for real reviews to be added later
  const reviews = [];

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
        <h2 className="section-title">Client <span className="text-gradient">Reviews</span></h2>
        
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
                  <a href={review.websiteLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    {review.websiteName} ↗
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
