import React, { useRef, useState } from 'react';
import css from './AddCustomer.module.css';
import axios from '../../../utils/axios.instance';
import Swal from 'sweetalert2';

function AddCustomer() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const customerData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    };
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post('/customer/add_customer',  customerData ,{ headers: { Authorization: `Bearer ${token}` }});
      if (res.data.success) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success', // or 'error', 'info', 'warning'
          title: 'Customer succesfully inserted!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        e.target.reset(); 

      } else {
        setMessage("")
        setError(res.data.message)
      }
    } catch (error) {
      Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error', // or 'error', 'info', 'warning'
          title: 'Unable to insert customer, Internal server error!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.heading}>Add New Customer</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input ref={firstNameRef} type="text" name="first_name" placeholder="First Name" required />
        <input ref={lastNameRef} type="text" name="last_name" placeholder="Last Name" required />
        <input ref={emailRef} type="email" name="email" placeholder="Email" required />
        <input ref={phoneRef} type="text" name="phone" placeholder="Phone" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
