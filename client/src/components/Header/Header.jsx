import React, { useContext } from 'react'
import css from './Header.module.css'
import { useState, useEffect } from 'react';
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import logo_light from '../../assets/logo_light.png';
import logo_dark from '../../assets/logo_dark.png';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaWindowClose } from "react-icons/fa";
import {Context} from '../Context'
import { Type } from '../../utils/action.type';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {state, dispatch} = useContext(Context)
  const theme = state?.theme
  const toggleTheme = () => dispatch({ type: Type.TOGGLE_THEME });
    function toggleMenu() {
      setIsMenuOpen((prevState) => !prevState);
    }
    const user = state.user;
  return (
    <>
      <header className={css.header}>
        <p className={css.red}>Enjoy the BESO while we fix your car!</p>
        <div className={css.blue}>
            <p>Monday - Sunday 7:00AM-6:00PM</p>
            <Link to="/profile">
            <div className={css.user}>
            <FaUser />
            <p>Welcome: {user?.role || 'Customer'}</p>
            </div>
            </Link>
            {theme === 'light' ? <IoMoon onClick={toggleTheme} /> : <IoMdSunny onClick={toggleTheme} />} 
        </div>
        </header>
      <nav className={css.nav}>
        <Link to="/">
          <div className={css.left}>
              { theme === 'light' ? <img src={logo_light} alt="Logo" className={css.logo} /> : <img src={logo_dark} alt="Logo" className={css.logo} />}
          </div>
        </Link>
        <div className={css.right}>
          <Link to="/"><p>Home</p></Link>
          <Link to="/about"><p>About</p></Link>
          <Link to="/contact"><p>Contact</p></Link>
          <Link to="/services"><p>Services</p></Link>
          <Link to="/dashboard"><p>Dashboard</p></Link>
          {user ? (<a className={css.right_container} href="tel:+25111555987" ><button className={css.login}>Call</button></a>): (<Link className={css.right_container} to="/auth"><button className={css.login}>Login</button></Link>)}
        </div>
        <IoMenu onClick={toggleMenu} className={css.menu}/>
      </nav>

      {/* Vertical header */}
     {
      isMenuOpen && ( <div className={css.vertical_header}>
         <div className={css.container}>
          <FaWindowClose onClick={toggleMenu} className={css.closeIcon} />
          <Link to="/"><p>Home</p></Link>
          <Link to="/about"><p>About</p></Link>
          <Link to="/contact"><p>Contact</p></Link>
          <Link to="/services"><p>Services</p></Link>
         <Link to="/dashboard"><p>Dashboard</p></Link>
        </div>
          <Link to="/auth"><button className={css.login}>Login</button></Link>
      </div>)
     }
    </>
  )
}

export default Header
