import React from 'react'
import css from './NewOrder.module.css'
import axios from '../../../utils/axios.instance';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

function NewOrder() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);

  const customerRef = useRef();
  const vehicleRef = useRef();
  const employeeRef = useRef();
  const statusRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();
  const additionalServceRef = useRef();
  const [selectedServices, setSelectedServices] = useState([]);



  useEffect(() => {
     Swal.fire({
      icon: "info",
      title: "Reminder",
      text: "Before placing an order, make sure the customer and their vehicle are already added to the database.",
    });
  async function loadData() {
    const token = localStorage.getItem("token");
    const res1 = await axios.get('/customer/customers', { headers: { Authorization: `Bearer ${token}` }});
    const res2 = await axios.get('/vehicle/vehicles', { headers: { Authorization: `Bearer ${token}` }});
    const res3 = await axios.get('/service/services', { headers: { Authorization: `Bearer ${token}` }});
    const res4 = await axios.get('/user/users', { headers: { Authorization: `Bearer ${token}`}});
    setCustomers(res1.data.customers);
    setVehicles(res2.data.vehicles);
    setServices(res3.data.services);
    setEmployees(res4.data.users);
  }
  loadData();
}, []);

async function handleSubmitOrder(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");

  // Step 1: Create Order
  const orderData = {
    customer_id: customerRef.current.value,
    vehicle_id: vehicleRef.current.value,
    employee_id: employeeRef.current.value,
    status: statusRef.current.value
  };

  try {
    const orderRes = await axios.post("/order/add_order", orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const order_id = orderRes.data.order_id;

    // Step 2: Create Order Info
    const orderInfoData = {
      order_id: order_id,
      order_total_price: parseFloat(priceRef.current.value),
      order_estimated_completion_date: dateRef.current.value,
      order_additional_requests: additionalServceRef.current.value || "No request"

    };

    await axios.post("/order/add_order_info", orderInfoData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const requestDatas = {
        order_id: order_id,
        service_ids: selectedServices
      }
        // Step 3: Assign Services
      if (selectedServices.length > 0) {
        await axios.post("/request/add_request",requestDatas , {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      // Reset all refs
        customerRef.current.value = "";
        vehicleRef.current.value = "";
        employeeRef.current.value = "";
        statusRef.current.value = "";
        priceRef.current.value = "";
        dateRef.current.value = "";
        additionalServceRef.current.value = "";

        // Reset services
        setSelectedServices([]);
    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "The order and order info have been successfully submitted.",
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text: "Something went wrong while submitting the order.",
    });
  }
}

  return (
    <div className={css.neworder}>
      <h1>Place Order</h1>
      <div className={css.title}>
         <h2>1, Choose Customer</h2>
      </div>
          <select ref={customerRef}>
            <option value="">Select Customer</option>
            {customers?.map(c => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.first_name} {c.last_name} - {c.email}
              </option>
            ))}
          </select>
      <div className={css.title}>
          <h2>2, Choose Customer's Vehicle</h2>    
      </div>
      <select ref={vehicleRef}>
        <option value="">Select Vehicle</option>
        {vehicles?.map(v => (
          <option key={v.vehicle_id} value={v.vehicle_id}>
            {v.color} {v.brand} {v.year} {v.type}
          </option>
        ))}
      </select>   
      <h2>3, Choose Services</h2>
<div className={css.services}>
        {services?.map(s => (
  <div key={s.service_id}>
    <label>
      <input
        type="checkbox"
        value={s.service_id}
        onChange={(e) => {
          const id = parseInt(e.target.value);
          if (e.target.checked) {
            setSelectedServices(prev => [...prev, id]);
          } else {
            setSelectedServices(prev => prev.filter(sid => sid !== id));
          }
        }}
        checked={selectedServices.includes(s.service_id)}
      />
      {s.name}
    </label>
  </div>
))}
</div>

        <h2>4, Assign Employee</h2>
          <select ref={employeeRef}>
            <option value="">Assign Employee</option>
            {employees?.map(e => (
              <option key={e.user_id} value={e.user_id}>
               {e.first_name} {e.last_name} -{e.email}
              </option>
            ))}
          </select>
          <h2>5, Order Status</h2>
           <select ref={statusRef}> 
            <option value="">Select order status</option>           
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
          </select>
        <h2>6, Order Information</h2>
        <div className={css.orderInfo} >
          <div className={css.one}>
            <span>Order total price:</span>
            <input ref={priceRef} type="text" placeholder='1260.00'/>            
          </div>
          <div className={css.one}>
              <span>Order estimated completion date:</span>
              <input ref={dateRef} type="date" placeholder='1260.00'/>            
          </div>
          <div className={css.one}>
              <span>Addistional request:</span>
              <textarea ref={additionalServceRef} cols={20} rows={5} placeholder='Please include a full tank of gas and a car wash.'/>            
          </div>
        </div>
      <button onClick={handleSubmitOrder}>
        Submit Order
      </button>

    </div>
  )
}

export default NewOrder
