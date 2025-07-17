import React, { useContext, useState } from 'react';
import css from './Auth.module.css';
import logo_light from '../../assets/logo_light.png'
import logo_dark from '../../assets/logo_dark.png'
import { Link, useNavigate } from 'react-router-dom';
import {Context} from '../../components/Context'
import axios from '../../utils/axios.instance';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Type } from '../../utils/action.type';
import Swal from 'sweetalert2';

function Auth() {
 const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const theme = state.theme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic Validation
    if (!email || !password) {
      setError('Both fields are required.');
      setTimeout(() => setError(null), 2000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address.');
      setTimeout(() => setError(null), 2000);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setTimeout(() => setError(null), 2000);
      return;
    }

    try {
      const res = await axios.post('/user/login', { email, password });

      if (res.data.success === true) {
        const token = res.data.token;

        // Optional: Save token first
        localStorage.setItem('token', token);

        const res2 = await axios.get('/user/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res2.data.success) {
          dispatch({
            type: Type.SET_USER,
            user: res2.data.user,
          });
        } else {
          localStorage.removeItem('token');
          dispatch({ type: Type.SET_USER, user: null });
        }

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'User logged in successfully!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setError('');
        return navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setTimeout(() => setError(null), 2000);
    }
  }

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

        <div className={`${css.inputGroup} ${css.passwordContainer}`}>
          <label>Password</label>
          {
            showPassword ? 
               <input
                  type="text" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
            :  <input
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
          }
          {
            showPassword ? <IoEye onClick={()=>setShowPassword((prev)=> !prev)}/> : <IoMdEyeOff onClick={()=>setShowPassword((prev)=> !prev)}/>
          }
          
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