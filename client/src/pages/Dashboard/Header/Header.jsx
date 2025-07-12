import React, { useState, useEffect, useContext,useRef  } from 'react'
import css from './Header.module.css'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import {Context} from '../../../components/Context'
import Sidebar from '../Sidebar/Sidebar'
function Header({value} ) {
 const {state, dispatch, toggleTheme} = useContext(Context)
 const [showSidebar, setShowSidebar] = value;
  const [mobilebar, setMobilebar] = useState(false)
  const theme = state.theme
   const [time, setTime] = useState(new Date());
     useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); // cleanup
  }, []);

  const formattedTime = time.toLocaleTimeString(); // e.g., "2:45:09 PM"
  function toggleMobilebar() {
    setMobilebar((prevState) => !prevState);
  }
  function toggleMenu() {
    setShowSidebar((prevState) => !prevState);
  }
    const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked element is NOT inside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
       setMobilebar(() => false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobilebar]);
  return (
    <>
    <div className={css.header}>
      <div className={css.search}>
      <div className={css.container}>
        <input type="text" placeholder="Search..." />  
        <FaSearch />
      </div>        
      </div>
      <div className={css.icons}>
        <h1></h1>
        <span className={css.time}>{formattedTime}</span>
        <Link to="/"><FaHome /></Link>
        {
          theme === 'dark' ? <IoMdSunny onClick={toggleTheme} /> : <IoMoon onClick={toggleTheme}/>
        }
        <Link to="/dashboard/setting"><IoMdSettings /></Link>
        <Link to="/dashboard/profile"><FaUserCircle /></Link>
        <IoMenu onClick={window.innerWidth >= 750 ? toggleMenu : toggleMobilebar} />        
      </div>
    </div>
    {
      mobilebar && <div ref={sidebarRef} className={css.mobilebar}>
        <Sidebar />
        </div>
    }
    
    </>
  )
}

export default Header
