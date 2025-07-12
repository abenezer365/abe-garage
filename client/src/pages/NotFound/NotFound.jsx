import React from 'react'
import css from './NotFound.module.css'
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

function NotFound() {
  return (
       <div className={css.wrapper}>
      <div className={css.content}>
        <FaRocket className={css.rocket} />
        <h1 className={css.code}>404</h1>
        <h2 className={css.message}>Oops! Page Not Found</h2>
        <p className={css.description}>
          The page you're looking for might have been abducted by aliens or launched into space 🚀
        </p>
        <Link to="/" className={css.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
