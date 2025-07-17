import React, { useContext, useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import {useNavigate} from 'react-router-dom'
import css from './Setting.module.css';
import { Context } from '../../../components/Context';
import Swal from 'sweetalert2';
import axios from '../../../utils/axios.instance';
import { Type } from '../../../utils/action.type';

function Setting() {
  const { state, dispatch } = useContext(Context);
  const user = state.user;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  
  const handleEditSubmit = async (formData) => {
    try{
      const userData = {        
        first_name : formData.first_name,
        last_name : formData.last_name,
        email : formData.email,
        phone : formData.phone
      }
        const token = localStorage.getItem("token");
        const res = await axios.patch('/user/edit',userData,{ headers: { Authorization: `Bearer ${token}`}});
        if (res.data.success) {
           Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success', // or 'error', 'info', 'warning'
                    title: 'User profile updated!',
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
      }};

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
        const res = await axios.delete(`/user/delete/${user.user_id}`, {
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
  const handleLogout = async () => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'You are about to log out!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#EE0D09',
         cancelButtonColor: '#797979ff',
         confirmButtonText: 'Yes, logout!',
         backdrop: true,
         width: '400px',
       });
     
       if (result.isConfirmed) {
          localStorage.removeItem("token");
          navigate("/")
          dispatch({ type: Type.SET_USER, user: null });
       }
  };

  return (
    <div className={css.settings}>
      <div className={css.head}>
          <h2>Settings</h2>
     </div>
    <div className={css.header}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
        alt="User avatar"
        className={css.avatar}
      />
      <div>
        <h2 className={css.name}>{user.first_name} {user.last_name}</h2>
        <p className={css.email}>{user.email}</p>
      </div>
    </div>
      <div className={css.card}>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div className={css.btn}>
          <button className={css.edit} onClick={() => setOpen(true)}>Edit</button>
          <button className={css.logout} onClick={handleLogout}>Log Out</button>
          <button className={css.delete} onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        fields={['first_name', 'last_name','phone', 'email', ]}
        data={user}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default Setting;
