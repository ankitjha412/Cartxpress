import React, { useState, useEffect } from 'react';
import './footer.css';
import QRCode from 'react-qr-code';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="footer">
        <div className="text" style={{fontSize:"25px",marginLeft:"25px",position:"relative", top:"55px"}}>CartXpress</div>
      <div className="footer-container">
        {/* Social Media Icons */}
        <div className="footer-social">
        <a href="https://www.linkedin.com/in/ankit-jha-b44435259/" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-linkedin-in"></i>
</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <QRCode
            size={75}
            bgColor='#232f3e'
            fgColor='white'
            value='https://ankitjha412.github.io/portfolio/'
            style={{position:"relative",left:"36%"}}
        />
      </div>
    <hr />
    
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CartXpress. All rights reserved.</p>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <div className="back-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </div>
      )}
    </footer>
  );
};

export default Footer;
