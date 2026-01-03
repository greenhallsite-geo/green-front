import React, { useState, useEffect } from 'react';
import '../styles/ContactForm.css';

function ContactForm() {
  const [fileName, setFileName] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFileName(file.name);
      } else {
        alert('Please upload a PDF file only');
        e.target.value = '';
        setFileName('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://usebasin.com/f/0ae535297db2", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });

      if (response.status === 200) {
        setShowSuccessAlert(true);
        e.target.reset();
        setFileName('');
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
    } catch (error) {
      console.error(error);
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <div className="contact-form-body">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2 className="contact-form-heading">Get In Touch</h2>
              <h3 className="contact-form-title">
                Interested in selling your business to Greenhall Capital?
              </h3>
              <p className="contact-form-description">
                Share your details and business information with us. Our team will review your submission and get back to you shortly.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group2">
                <label htmlFor="fullName" className="form-label2">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="form-group2">
                <label htmlFor="phone" className="form-label2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="form-group2">
                <label htmlFor="email" className="form-label2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john.smith@example.com"
                  required
                />
              </div>

              <div className="form-group2">
                <label htmlFor="pdf" className="form-label2">Business Information (PDF)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="pdf"
                    name="file"
                    className="file-input"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="pdf" className="file-input-label">
                    <span className="file-input-text">
                      {fileName || 'Choose PDF file'}
                    </span>
                    <span className="file-input-button">Browse</span>
                  </label>
                </div>
                <p className="form-helper-text">Upload a PDF with your business details (optional)</p>
              </div>

              <button 
                type="submit"
                className="form-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              {errors.length > 0 && !isSubmitting && (
                <div className="form-message form-message--error">
                  <p>⚠️ Oops! Something went wrong.</p>
                  <p>Please check all fields and try again. If the problem persists, please contact us directly.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Success Alert Modal */}
      {showSuccessAlert && (
        <div className="alert-overlay">
          <div className="alert-modal">
            <div className="alert-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
                <path d="M8 12l2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="alert-title">Success!</h3>
            <p className="alert-message">
              Your submission has been received successfully. Our team will review your information and get back to you shortly.
            </p>
            <button className="alert-close-button" onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactForm;