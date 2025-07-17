import React, { useEffect, useState } from 'react';
import css from './Services.module.css';
import axios from '../../../utils/axios.instance';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { truncate } from '../../../utils/constants';


function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('/service/services', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setServices(res.data.services);
           Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success', // or 'error', 'info', 'warning'
                title: 'Services loaded successfully!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const handleDelete = async (service_id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EE0D09',
    cancelButtonColor: '#091436',
    confirmButtonText: 'Yes, delete it!',
    backdrop: true,
    width: '500px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/service/delete/${service_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Deleted!', 'The user has been removed.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  }
};


  const handleEdit = (service) => {
    console.log("Edit service", service);
  };

  if (loading) return <div className={css.loading}>Loading services...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.heading}>All Services</h2>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.service_id}>
                
                <td>{index + 1}</td>
                <td>{service.name}</td>
                {
                  window.innerWidth < 700 ? 
                  <td className={css.desc}>{truncate(service.description, 50) }</td> :
                  <td className={css.desc}>{service.description}</td> 
                }
                <td>
                  <p className={`${service.is_active ? css.active : css.terminated}`}>
                    {service.is_active ? 'Active' : 'Terminated'}
                  </p>
                </td>
                <td className={css.actions}>
                  <FaEdit className={css.editIcon} onClick={() => handleEdit(service)} />
                  <FaTrash className={css.deleteIcon} onClick={() => handleDelete(service.service_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
