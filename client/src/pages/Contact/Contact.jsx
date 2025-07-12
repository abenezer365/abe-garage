import React from 'react'
import css from './Contact.module.css'
import { Link } from 'react-router-dom'
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
function Contact() {
  return (
       <div className={css.contact}>
      <div className={css.head}>
        <div className={css.contents}>
          <h1>Contact Us</h1>
          <p> <Link to="/">Home</Link> &gt; Contact us</p>
        </div>
      </div>
      <section className={css.address}>
        <div className={css.left}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8408.904129596349!2d-73.94936475823113!3d40.930022684120935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x457c7fa5098315a1%3A0x28f4f6f1371f8196!2sABE%20GARAGE%20DOOR%20LLC!5e1!3m2!1sen!2set!4v1752259503627!5m2!1sen!2set" width="800" height="600" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className={css.right}>
          <h1>Our Address</h1>
          <h4>Completely synergize resource Professionally cultivate one-to-one customer service.</h4>
          <div className={css.box}>
            <MdOutlineMyLocation />
            <div className={css.txt}>
              <h5>Address:</h5>
              <p>ABE GARAGE DOOR LLC, USA</p>
            </div>
          </div>
          <div className={css.box}>
            <MdOutlineMailOutline />
            <div className={css.txt}>
              <h5>Email:</h5>
              <p>info@abegarage.com</p>
            </div>
          </div>
          <div className={css.box}>
          <MdOutlinePhoneInTalk />
            <div className={css.txt}>
              <h5>Tel:</h5>
              <p>+251-11-555-987</p>
            </div>
          </div>
        </div>
      </section>
        <section className={css.appointment}>
              <div className={css.book}>
                <div className={css.top}>
                   <h2>Book an Appointment</h2>
                   <p>Schedule your car service appointment online today and experience the best in automotive care.</p>
                </div>
                <div className={css.bottom}>
                <h1>1800.456.7890</h1>
                <Link to="/appointment" className={css.bookButton}><button>BOOK NOW</button></Link>
                </div>
               
              </div>
            </section>
    </div>
  )
}

export default Contact


