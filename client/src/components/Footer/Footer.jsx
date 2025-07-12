import React from "react";
import css from "./Footer.module.css";
import {  FaFacebookF, FaLinkedinIn,FaTwitter, FaGooglePlusG, FaMapMarkerAlt, FaEnvelope,FaPhoneAlt} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.topBar}>
        <div className={css.infoItem}>
          <FaMapMarkerAlt className={css.icon} />
          <span>
            54B, Tailstoi Town 5238 MT,<br />La city, IA 522364
          </span>
        </div>
        <div className={css.infoItem}>
          <FaEnvelope className={css.icon} />
          <span>Email us : <a href="mailto:contact@autorex.com">contact@autorex.com</a></span>
        </div>
        <div className={css.infoItem}>
          <FaPhoneAlt className={css.icon} />
          <span>Call us on : <strong>+ 1800 456 7890</strong></span>
        </div>
      </div>

      <div className={css.mainContent}>
        <div className={css.column}>
          <p className={css.text}>
            Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.
            Override the digital divide with additional clickthroughs.
          </p>
        </div>
        <div className={css.column}>
          <h4>Useful Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Appointment</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className={css.column}>
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">Performance Upgrade</a></li>
            <li><a href="#">Transmission Service</a></li>
            <li><a href="#">Break Repair & Service</a></li>
            <li><a href="#">Engine Service & Repair</a></li>
            <li><a href="#">Tyre & Wheels</a></li>
          </ul>
        </div>
        <div className={css.column}>
          <h4>Newsletter</h4>
          <p>Get latest updates and offers.</p>
          <div className={css.socialIcons}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Google Plus"><FaGooglePlusG /></a>
          </div>
        </div>
      </div>

      <div className={css.bottomBar}>
        <p>© Copyright Abe Garage 2023. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
