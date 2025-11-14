import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import diamondLogo from '../assets/images/diamond.png';
import gbFlag from '../assets/images/GB.png';
import seFlag from '../assets/images/SE.png';

function Login() {
  const [language, setLanguage] = useState('sv');
  const [texts, setTexts] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTexts();
  }, [language]);

  const fetchTexts = async () => {
    try {
      const response = await fetch(`/api/texts/login?lang=${language}`);
      const data = await response.json();
      setTexts(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate('/pricelist');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const flagUrl = language === 'en' ? gbFlag : seFlag;

  return (
    <div className="login-container">
      <div className="background-image"></div>
      
      <nav className="top-nav">
        <div className="logo-section">
          <img 
            src={diamondLogo}
            alt="123 Fakturera" 
            className="nav-logo"
          />
        </div>
        
        <ul className="nav-menu">
          <li><a href="/">Hem</a></li>
          <li><a href="/bestall">Beställ</a></li>
          <li><a href="/customers">Våra Kunder</a></li>
          <li><a href="/about">Om oss</a></li>
          <li><a href="/contact">Kontakta oss</a></li>
          <li className="language-item">
            <button className="language-btn" onClick={() => switchLanguage(language === 'en' ? 'sv' : 'en')}>
              <span>Svenska</span>
              <img src={flagUrl} alt="Flag" className="flag-icon" />
            </button>
          </li>
        </ul>
      </nav>

      <div className="login-content">
        <div className="login-box">
          <h1 className="login-title">Logga in</h1>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">Skriv in din epost adress</label>
              <input
                type="text"
                placeholder="Epost adress"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Skriv in ditt lösenord</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              Logga in
            </button>
          </form>

          <div className="login-footer">
            <a href="/register" className="link">Registrera dig</a>
            <a href="/forgot-password" className="link">Glömt lösenord?</a>
          </div>
        </div>
      </div>

      <footer className="login-footer-bottom">
        <div className="footer-left">
          <span className="footer-brand">123 Fakturera</span>
        </div>
        <div className="footer-right">
          <a href="/">Hem</a>
          <a href="/bestall">Beställ</a>
          <a href="/contact">Kontakta oss</a>
        </div>
        <div className="footer-copyright">
          © Lättfakturera i Norden AB38437, 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Login;
