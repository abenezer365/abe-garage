import React, { useEffect, useState } from 'react';
import css from './Employees.module.css';
import axios from '../../../utils/axios.instance';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

const handleDelete = async (user_id) => {
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
      const res = await axios.delete(`/user/delete/${user_id}`, {
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
  const activate = async (user_id) => {
  const result = await Swal.fire({
    title: 'Activate selected employee!',
    text: 'Activating this user enables the employee to access work material again!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#41b300ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Activate!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/user/activate/${user_id}`, {},{
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Well done!', 'Notification sent to customers email!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};
  const deactivate = async (user_id) => {
  const result = await Swal.fire({
    title: 'Deactivate selected employee!',
    text: 'ምን ቢያጠፋ/ብታጠፋ Deactivate ኧረ ሼም ነው! ይመከር/ትመከር',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#005cb3ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Deactivate!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/user/deactivate/${user_id}`, {},{
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Well done!', 'Notification sent to customers email!', 'success');
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

  useEffect(() => {
    async function fetchEmployees() {
      try {
         const token = localStorage.getItem("token");
        const res = await axios.get('/user/users', { headers: { Authorization: `Bearer ${token}`}});
        if (res.data.success) {
          setEmployees(res.data.users);
           Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success', // or 'error', 'info', 'warning'
                    title: 'Employees loaded successfully!',
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
    fetchEmployees();
  }, []);


  if (loading) return <div className={css.loading}>Loading employees...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.heading}>All Employees</h2>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Status</th>
              <th>Employee Phone</th>
              <th>Employee Role</th>
              <th>Actions</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td className={`${emp.is_active === 1 ? css.active : css.inactive}`}>{emp.is_active === 1 ? 'active' : 'inactive'}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td className={css.actions}>
                  <FaEdit className={css.editIcon} onClick={() => handleEdit(emp)} />
                  <FaTrash className={css.deleteIcon} onClick={() => handleDelete(emp.user_id)} />
                </td>
                 <td>
                    <p onClick={() => activate(emp.user_id)} className={css.activate}>Activate</p>
                    <p onClick={() => deactivate(emp.user_id)} className={css.deactivate}>Deactivate</p>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
