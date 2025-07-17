import React, { useEffect, useState } from 'react';
import css from './Customer.module.css';
import axios from '../../../utils/axios.instance';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      try {
         const token = localStorage.getItem("token");
        const res = await axios.get('/customer/customers', { headers: { Authorization: `Bearer ${token}`}});
        if (res.data.success) {
          setCustomers(res.data.customers);
           Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success', // or 'error', 'info', 'warning'
                title: 'Customers loaded successfully!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
          });
        }
      } catch (error) {
         Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error', // or 'error', 'info', 'warning'
            title: 'Unable to load orders!',
            showConfirmButton: true,
            timerProgressBar: true,
        });
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);


  const handleDelete = async (customer_id) => {
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
      const res = await axios.delete(`/customer/delete/${customer_id}`, {
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


  const activate = async (customer_id) => {
  const result = await Swal.fire({
    title: 'Activate selected customer!',
    text: 'Activating this customer enables the customer to be your acrive resilent customer and can receive campain ads and other things!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2a7400ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Activate!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/customer/activate/${customer_id}`, {},{
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Well done!', 'Customer activated succesfully!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};
  const deactivate = async (customer_id) => {
  const result = await Swal.fire({
    title: 'Deactivate selected employee!',
    text: 'ምን ቢያጠፋ/ብታጠፋ Deactivate ኧረ ሼም ነው! ይመከር/ትመከር',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0053a0ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Deactivate!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/customer/deactivate/${customer_id}`, {},{
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Well done!', 'Customer deactivated!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};
  const handleEdit = (user) => {
    // Navigate or open edit modal with user data
    console.log("Edit user", user);
  };

  if (loading) return <div className={css.loading}>Loading employees...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.heading}>All Customers</h2>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Date of registration</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.user_id}>
                <td>{index + 1}</td>
                <td>{customer.first_name} {customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.created_at}</td>
                <td >
                  <p className={`${customer.is_active == 1 ? css.active : css.terminated}`}>{customer.is_active == 1 ? 'Active' : 'Terminated'}</p>                  
                </td>
                 <td className={css.actions}>
                    <FaEdit className={css.editIcon} onClick={() => handleEdit(customer)} />
                    <FaTrash className={css.deleteIcon} onClick={() => handleDelete(customer.customer_id)} />
                  </td>
                  <td>
                    <p onClick={() => activate(customer.customer_id)} className={css.activate}>Activate</p>
                    <p onClick={() => deactivate(customer.customer_id)} className={css.deactivate}>Deactivate</p>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
