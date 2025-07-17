import React, { useRef, useState } from 'react';
import css from './AddEmployee.module.css';
import axios from '../../../utils/axios.instance';
import Swal from 'sweetalert2';

function AddEmployee() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const employeeData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      role: roleRef.current.value,
    };
    
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post('/user/add_user',  employeeData ,{ headers: { Authorization: `Bearer ${token}` }});
      if (res.data.success) {
         Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Employee added successfully!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        e.target.reset(); 
      } else {
         Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Unable to add employee!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
       Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong!',
        showConfirmButton: true,
        timerProgressBar: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.heading}>Add New Employee</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input ref={firstNameRef} type="text" name="first_name" placeholder="First Name" required />
        <input ref={lastNameRef} type="text" name="last_name" placeholder="Last Name" required />
        <input ref={emailRef} type="email" name="email" placeholder="Email" required />
        <input ref={passwordRef} type="password" name="password" placeholder="Password" required />
        <input ref={phoneRef} type="text" name="phone" placeholder="Phone" required />
        <select ref={roleRef} name="role" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
