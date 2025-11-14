import React, { useState, useEffect } from 'react';
import '../styles/Terms.css';

function Terms() {
  const [language, setLanguage] = useState('en');
  const [texts, setTexts] = useState({});

  useEffect(() => {
    fetchTexts();
  }, [language]);

  const fetchTexts = async () => {
    try {
      const response = await fetch(`/api/texts/terms?lang=${language}`);
      const data = await response.json();
      setTexts(data);
    } catch (err) {
      console.error('Error fetching texts:', err);
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const flagUrl = language === 'en' 
    ? 'https://storage.123fakturere.no/public/flags/GB.png'
    : 'https://storage.123fakturere.no/public/flags/SE.png';

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">{texts.title || 'Terms and Conditions'}</h1>
        
        <div className="language-selector" onClick={() => switchLanguage(language === 'en' ? 'sv' : 'en')}>
          <span className="language-text">{language === 'en' ? 'English' : 'Svenska'}</span>
          <img src={flagUrl} alt="Flag" className="flag" />
        </div>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2>{texts.section1Title || 'General Terms'}</h2>
          <p>{texts.section1Content || 'By using this service, you agree to these terms and conditions.'}</p>
        </div>

        <div className="terms-section">
          <h2>{texts.section2Title || 'User Responsibilities'}</h2>
          <p>{texts.section2Content || 'Users are responsible for maintaining the confidentiality of their account.'}</p>
        </div>

        <div className="terms-section">
          <h2>{texts.section3Title || 'Privacy Policy'}</h2>
          <p>{texts.section3Content || 'We respect your privacy and protect your personal information.'}</p>
        </div>

        <div className="terms-section">
          <h2>{texts.section4Title || 'Limitation of Liability'}</h2>
          <p>{texts.section4Content || 'The service is provided as is without any warranties.'}</p>
        </div>

        <div className="terms-section">
          <h2>{texts.section5Title || 'Changes to Terms'}</h2>
          <p>{texts.section5Content || 'We reserve the right to modify these terms at any time.'}</p>
        </div>
      </div>

      <div className="terms-footer">
        <button className="back-button" onClick={() => window.history.back()}>
          {texts.backButton || 'Go Back'}
        </button>
      </div>
    </div>
  );
}

export default Terms;
