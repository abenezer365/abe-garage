import React from 'react'
import css from './About.module.css'
import { Link } from 'react-router-dom'
import oil from '../../assets/oil2.png'
import magnet from '../../assets/magnet.png'
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { BsAward } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
function About() {
  return (
    <div className={css.about}>
      <div className={css.head}>
        <div className={css.contents}>
          <h1>About Us</h1>
          <p><Link to="/">Home</Link> &gt; About us</p>
        </div>
      </div>
      <section className={css.we}>
        <div className={css.left}>
          <h1>We are highly skilled mechanics for your car repair</h1>
          <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.</p>
        </div>
        <div className={css.right}>
          <img src="https://cdn.shopify.com/s/files/1/0680/2538/5243/files/car-lift_480x480.jpg?v=1689004542" alt="" />
        </div>
      </section>
          <section className={css.workshop}>
            <div className={css.left}>
              <img src={oil} alt="" />
              <img src={magnet} alt="" />
              <div className={css.year}>
                <h1>24</h1>
                <p>Years of Experience</p>
              </div>
            </div>
            <div className={css.right}>
              <p className={css.top}>Welcome to Our workshop</p>
              <h2>We have 24 years experience</h2>        
              <span className={css.red}></span>
              <p className={css.description}>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.
              Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.</p>
            </div>
          </section>
                  <section className={css.why}>
                <div className={css.container}>
                  <div className={css.left}>
                    <h2 className={css.heading}>
                      Why Choose Us <span className={css.line}></span>
                    </h2>
                    <p className={css.description}>
                      Bring to the table win-win survival strategies to ensure proactive
                      domination. At the end of the day, going forward, a new normal that
                      has evolved from generation heading towards.
                    </p>
                    <ul className={css.whyList}>
                      <li className={css.whyItem}><GrUserWorker /> Certified Expert Mechanics</li>
                      <li className={css.whyItem}><MdOutlineHomeRepairService /> Fast And Quality Service</li>
                      <li className={css.whyItem}><IoIosPricetags /> Best Prices in Town</li>
                      <li className={css.whyItem}><BsAward /> Awarded Workshop</li>
                    </ul>
                  </div>
          
                  <div className={css.right}>
                    <h3 className={css.subheading}>Additional Services</h3>
                    <ul className={css.additionalList}>
                      <li className={css.additionalItem}>🔧 General Auto Repair & Maintenance</li>
                      <li className={css.additionalItem}>🔧 Transmission Repair & Replacement</li>
                      <li className={css.additionalItem}>🔧 Tire Repair and Replacement</li>
                      <li className={css.additionalItem}>🔧 State Emissions Inspection</li>
                      <li className={css.additionalItem}>🔧 Break Job / Break Services</li>
                      <li className={css.additionalItem}>🔧 Electrical Diagnostics</li>
                      <li className={css.additionalItem}>🔧 Fuel System Repairs</li>
                      <li className={css.additionalItem}>🔧 Starting and Charging Repair</li>
                      <li className={css.additionalItem}>🔧 Steering and Suspension Work</li>
                      <li className={css.additionalItem}>🔧 Emission Repair Facility</li>
                      <li className={css.additionalItem}>🔧 Wheel Alignment</li>
                      <li className={css.additionalItem}>🔧 Computer Diagnostic Testing</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className={css.tag2}>
                <div className={css.content}>
                  <div className={css.top}>
                    <p>Working since 1992 </p>
                    <span className={css.red}></span>
                  </div>
                  <h1>We are leader <br /> in Car Mechanical Work</h1>
                  <div className={css.play}>
                  <IoPlay className={css.playIcon} />
                  <div className={css.texts}>
                    <p>WATCH INTRO</p>
                    <p>ABOUT US</p>
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

export default About
