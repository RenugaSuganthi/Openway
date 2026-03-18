import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, User, Lock, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const LoginPage = () => {
  const { language, toggleLanguage } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const from = location.state?.from || '/support';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const text = {
    tamil: {
      login: 'உள்நுழைவு',
      register: 'பதிவு செய்யவும்',
      username: 'பயனர் பெயர்',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      welcomeBack: 'மீண்டும் வருக!',
      welcome: 'நல்வரவு!',
      noAccount: 'கணக்கு இல்லையா?',
      alreadyAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      loginButton: 'உள்நுழைவு',
      registerButton: 'பதிவு செய்யவும்',
      toggle: 'English',
      usernameExists: 'இந்த பயனர் பெயர் ஏற்கனவே உள்ளது. வேறு பயனர் பெயரை முயற்சிக்கவும்.',
      emailExists: 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.',
      loginSuccess: 'உள்நுழைவு வெற்றிகரமாக நடைபெற்றது!',
      registerSuccess: 'பயனர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
      invalidCredentials: 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல்',
    },
    english: {
      login: 'Login',
      register: 'Register',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      welcomeBack: 'Welcome Back!',
      welcome: 'Welcome!',
      noAccount: "Don't have an account?",
      alreadyAccount: 'Already have an account?',
      loginButton: 'Login',
      registerButton: 'Register',
      toggle: 'தமிழ்',
      usernameExists: 'This username already exists. Please try a new username.',
      emailExists: 'This email is already registered.',
      loginSuccess: 'Login Successful!',
      registerSuccess: 'User Registered Successfully!',
      invalidCredentials: 'Invalid Username or Password',
    },
  };

  const t = text[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  // ===== REGISTER =====
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8082/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setSuccess(t.registerSuccess);
        setFormData({ username: '', email: '', password: '' });
        setTimeout(() => {
          setIsLogin(true);
          setSuccess('');
        }, 1500);
      } else if (data.includes('username')) {
        setError(t.usernameExists);
      } else if (data.includes('email')) {
        setError(t.emailExists);
      } else {
        setError(data || 'Registration failed');
      }
    } catch (err) {
      setError('Server not reachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // ===== LOGIN =====
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8082/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.text();

      if (response.ok && data === 'Login Successful') {
        setSuccess(t.loginSuccess);

        // Fetch full user info
        const userResponse = await fetch(
  `http://localhost:8082/users/username/${formData.username}`
);
        const userData = userResponse.ok ? await userResponse.json() : {};

        login({
          username: formData.username,
          email: userData.email || '',
          name: userData.name || formData.username,
          phone: userData.phone || '',
          age: userData.age || '',
          dob: userData.dob || '',
          gender: userData.gender || '',
          address: userData.address || '',
          profileImage: userData.profileImage || null,
        });

        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        setError(t.invalidCredentials);
      }
    } catch (err) {
      setError('Server not reachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Language Toggle */}
      <div className="language-globe">
        <button onClick={toggleLanguage} className="globe-button">
          <Globe className="w-5 h-5 mr-1" />
          {t.toggle}
        </button>
      </div>

      <div className={`auth-wrapper ${isLogin ? '' : 'toggled'}`}>
        <div className="background-shape"></div>
        <div className="secondary-shape"></div>

        {/* LOGIN PANEL */}
        <div className="credentials-panel signin">
          <h2 className="slide-element">{t.login}</h2>
          {error && <div className="slide-element error-message">{error}</div>}
          {success && <div className="slide-element success-message">{success}</div>}

          <form onSubmit={loginUser}>
            <div className="field-wrapper slide-element">
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
              <label>{t.username}</label>
              <User className="field-icon" />
            </div>
            <div className="field-wrapper slide-element">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              <label>{t.password}</label>
              <Lock className="field-icon" />
            </div>
            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" disabled={loading}>
                {loading ? '...' : t.loginButton}
              </button>
            </div>
            <div className="switch-link slide-element">
              <p>
                {t.noAccount} <a onClick={() => setIsLogin(false)}>{t.register}</a>
              </p>
            </div>
          </form>
        </div>

        {/* WELCOME RIGHT */}
      <div className="welcome-section signin">
        <h2 className="slide-element">{t.welcomeBack}</h2>
      </div>

        {/* REGISTER PANEL */}
        <div className="credentials-panel signup">
          <h2 className="slide-element">{t.register}</h2>
          {error && <div className="slide-element error-message">{error}</div>}
          {success && <div className="slide-element success-message">{success}</div>}

          <form onSubmit={registerUser}>
            <div className="field-wrapper slide-element">
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
              <label>{t.username}</label>
              <User className="field-icon" />
            </div>
            <div className="field-wrapper slide-element">
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              <label>{t.email}</label>
              <Mail className="field-icon" />
            </div>
            <div className="field-wrapper slide-element">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              <label>{t.password}</label>
              <Lock className="field-icon" />
            </div>
            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" disabled={loading}>
                {loading ? '...' : t.registerButton}
              </button>
            </div>
            <div className="switch-link slide-element">
              <p>
                {t.alreadyAccount} <a onClick={() => setIsLogin(true)}>{t.login}</a>
              </p>
            </div>
          </form>
        </div>

         {/* WELCOME LEFT */}
      <div className="welcome-section signup">
        <h2 className="slide-element">{t.welcome}</h2>
      </div>
      
      </div>
    </div>
  );
};

export default LoginPage;