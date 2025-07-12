import React from 'react'
import css from './Services.module.css'
import { Link } from 'react-router-dom'
import { GrPerformance } from "react-icons/gr";
import { SiTransmission } from "react-icons/si";
import { MdOutlineCarRepair } from "react-icons/md";
import { PiEngineBold } from "react-icons/pi";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { FaPaintRoller } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { BsAward } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";

function Services() {
  return (
       <div className={css.contact}>
      <div className={css.head}>
        <div className={css.contents}>
          <h1>Services</h1>
          <p> <Link to="/">Home</Link> &gt; Services</p>
        </div>
      </div>
          <section className={css.services}>
      <div className={css.title}>
        <h2>Our Featured Services</h2>
      </div>
      <div className={css.services_container}>
        <div className={css.service}>
          <p>Performance Upgrade</p>
          <h3>Engine Repair</h3>
          <Link to="#">READ MORE +</Link>
          <GrPerformance />
        </div>
        <div className={css.service}>
          <p>Service and Repairs</p>
          <h3>Transmission Services</h3>
          <Link to="#">READ MORE +</Link>
          <SiTransmission />
        </div>
        <div className={css.service}>
          <p>Service and Repairs</p>
          <h3>Break Repair & Service</h3>
          <Link to="#">READ MORE +</Link>
          <MdOutlineCarRepair />
        </div>
        <div className={css.service}>
          <p>Service and Repairs</p>
          <h3>Engine Service & Repair</h3>
          <Link to="#">READ MORE +</Link>
          <PiEngineBold />
        </div>
        <div className={css.service}>
          <p>Service and Repairs</p>
          <h3>Tyre & Wheels</h3>
          <Link to="#">READ MORE +</Link>
          <TbSteeringWheelFilled />
        </div>
        <div className={css.service}>
          <p>Service and Repairs</p>
          <h3>Denting & Painting</h3>
          <Link to="#">READ MORE +</Link>
          <FaPaintRoller />
        </div>
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

export default Services


