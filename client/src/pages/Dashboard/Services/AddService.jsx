import React, { useRef, useState } from 'react';
import css from './AddService.module.css';
import axios from '../../../utils/axios.instance';
import Swal from 'sweetalert2';

function AddService() {
  const nameRef = useRef();
  const descriptionRef = useRef();
 
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const serviceData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value      
    };
    
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post('/service/add_service',  serviceData ,{ headers: { Authorization: `Bearer ${token}` }});
      if (res.data.success) {
         Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Service added successfully!',
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
        title: 'Unable to add service, Something went wrong!',
        showConfirmButton: true,
        timerProgressBar: true
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
      <h2 className={css.heading}>Add New Service</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" name="title" placeholder="Title" required />
        <textarea rows={10} ref={descriptionRef} type="text" name="description" placeholder="Description Name" required/>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Service'}
        </button>
      </form>
    </div>
  );
}

export default AddService;
