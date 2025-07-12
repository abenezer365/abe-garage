import React, { useState } from 'react';
import css from './Auth.module.css';
import logo_light from '../../assets/logo_light.png'
import logo_dark from '../../assets/logo_dark.png'
import { Link } from 'react-router-dom';
function Auth() {
  const theme = document.documentElement.getAttribute('data-theme');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Both fields are required.');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError('Invalid email address.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setError('');
    // 🔐 Submit to backend here
    alert('✅ Logged in successfully!');
  };

  return (
    <>
    <Link to="/">
     { theme === 'light' ? <img src={logo_light} alt="Logo" className={css.logo} /> : <img src={logo_dark} alt="Logo" className={css.logo} />}
    </Link>
    <div className={css.authWrapper}>
      <form className={css.authForm} onSubmit={handleSubmit}>
        <h2 className={css.title}>Welcome Back</h2>
        <p className={css.subtitle}>Login to your account</p>

        {error && <div className={css.error}>{error}</div>}

        <div className={css.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={css.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={css.loginBtn}>
          Sign In
        </button>

        <p className={css.footerText}>
          Don't have an account? <a href="/contact">Contact Us</a>
        </p>
      </form>
    </div>
            </>
  );
}
export default Auth;