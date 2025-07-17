import React from 'react'
import css from './Sidebar.module.css'
import { FaHome } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { MdCreate } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Sidebar() {   
        return (
              <div className={css.sidebar}>
                  <div className={css.profile}>
                    <h2>ADMIN</h2>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png" alt="" />
                  </div>
                  <div className={css.routes}>
                    <Link to="/dashboard/">     
                    <div className={css.single}>
                        <FaHome />
                        <p>Dashboard</p>
                    </div>
                    </Link>
                    <span>Data</span>
                     <Link to="/dashboard/orders">
                      <div className={css.single}>
                        <IoNewspaper />
                        <p>Orders</p>
                    </div>
                    </Link>
                   <Link to="/dashboard/employees">
                     <div className={css.single}>
                        <FaUsers />
                        <p>Employees</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/customers">
                     <div className={css.single}>
                       <RiCustomerServiceFill />
                        <p>Customers</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/vehicles">
                     <div className={css.single}>
                        <IoCarSportSharp />
                        <p>Vehicles</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/services">
                     <div className={css.single}>
                        <MdOutlineHomeRepairService />
                        <p>Services</p>
                    </div>
                    </Link>
                   
                    <span>Tools</span>
                     <Link to="/dashboard/new_order">
                    <div className={css.single}>
                        <MdCreate />
                        <p>New Order</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/add_vehicle">
                     <div className={css.single}>
                       <FaCar />
                        <p>Add Vehicle</p>
                    </div>
                    </Link>
                     <Link to="/dashboard/add_customer">
                     <div className={css.single}>
                       <MdCreateNewFolder />
                        <p>Add Customer</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/add_employee">
                     <div className={css.single}>
                       <FaUserPlus />
                        <p>Add Employee</p>
                    </div>
                    </Link>
                    <Link to="/dashboard/add_service">
                     <div className={css.single}>
                       <IoBagAdd />
                        <p>Add Service</p>
                    </div>
                    </Link>
                   

                  </div>
              </div>      
          )
    
}

export default Sidebar
