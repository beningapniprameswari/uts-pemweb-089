import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p className="copyright-text">
        &copy; {currentYear} Pemrograman Aplikasi dan Web RA | Bening Apni Prameswari 123140089
      </p>
      <div className="footer-links">
        <span>Powered by: </span>
        <a href="https://dog.ceo/dog-api/" target="_blank" rel="noopener noreferrer">Dog.ceo</a>
        <span className="separator">&middot;</span>
        <a href="https://api.thecatapi.com/" target="_blank" rel="noopener noreferrer">TheCatAPI</a>
        <span className="separator">&middot;</span>
        <a href="https://catfact.ninja/" target="_blank" rel="noopener noreferrer">CatFact.Ninja</a>
      </div>
    </footer>
  );
};

export default Footer;