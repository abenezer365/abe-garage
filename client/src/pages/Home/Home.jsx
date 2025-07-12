import React from 'react'
import css from './Home.module.css'
import { Link } from 'react-router-dom'
import oil from '../../assets/oil2.png'
import magnet from '../../assets/magnet.png'
import { GrPerformance } from "react-icons/gr";
import { SiTransmission } from "react-icons/si";
import { MdOutlineCarRepair } from "react-icons/md";
import { PiEngineBold } from "react-icons/pi";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { FaPaintRoller } from "react-icons/fa6";
import gage from '../../assets/gage.png'
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { BsAward } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
function Home() {

  return (
    <div className={css.home}>
      <div className={css.hero_container}>
      <div className={css.hero}>
        <div className={css.top}>
          <p>Working since 1992 </p>
          <span className={css.red}></span>
        </div>
        <h1>Tuneup Your Car <br /> to Next Level</h1>
        <div className={css.play}>
        <IoPlay className={css.playIcon} />
        <div className={css.texts}>
          <p>WATCH INTRO</p>
          <p>ABOUT US</p>
        </div>
        </div>
      </div>
      </div>
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
    <section className={css.tag}>
      <div className={css.left}>
        <h2>Quality Service And Customer Satisfaction !!</h2>
        <p>We utilize the most recent symptomatic gear to ensure your vehicle is fixed or adjusted appropriately and in an opportune manner. We are an individual from Professional Auto Service, a first class execution arrange, where free assistance offices share shared objectives of being world-class car administration focuses.</p>
        </div>
    <div className={css.right}>
      <img src={gage} alt="" />
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

export default Home
