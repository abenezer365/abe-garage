import React, { useEffect, useState } from 'react';
import css from './Orders.module.css';
import axios from '../../../utils/axios.instance';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('/order/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setOrders(res.data.orders);
          Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success', // or 'error', 'info', 'warning'
          title: 'Orders loaded successfully!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        }
      } catch (error) {
        console.log(error);
         Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error', // or 'error', 'info', 'warning'
          title: 'Unable to load orders!',
          showConfirmButton: true,
          timer: 5000,
          timerProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleDelete = async (order_id) => {
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
      const res = await axios.delete(`/order/delete/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Deleted!', 'The user has been removed.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};
  const generateInvoice = async (order_id) => {
  const result = await Swal.fire({
    title: 'Are you sure, to generate invoice?',
    text: 'Generated invoices are assumed as payable intent',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#41b300ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Yes, generate it!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/invoice/generate_invoice/${order_id}`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        Swal.fire('Generated!', 'Invoice generated', 'success');
      }else{        
        Swal.fire('Invoice already exist!', 'You now can send the invoice as it is generated earlier', 'success');
      }
    } catch (error) {
  const message = error?.response?.data?.message;

  if (message === "Invoice already exists for this order") {
    Swal.fire('Notice', 'Invoice already exists for this order!', 'info');
    return; // ⛔ Stop execution here
  }

  Swal.fire('Error', 'Internal server error', 'error');
  console.log(error);
      }}
};

  const sendInvoice = async (order_id) => {
  const result = await Swal.fire({
    title: 'Send Invoice?',
    text: 'Sending invoices automatically send The customer payment data',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#41b300ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Yes, generate it!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/invoice/send_invoice/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        Swal.fire('Generated!', 'Invoice sent to customers email!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};
  const markCompleted = async (order_id) => {
  const result = await Swal.fire({
    title: 'Are you sure the order is completed?',
    text: 'Marking this order as completed automatically send notification email!',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#41b300ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Yes, mark as completed!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/order/update_status/${order_id}`, {
        "status": "Completed"
      },{
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
  const markPending = async (order_id) => {
  const result = await Swal.fire({
    title: 'Are you sure to mark as pending?',
    text: 'Marking this order as in progress means the garage started serving the customer!',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#005cb3ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Yes, mark as in progress!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/order/update_status/${order_id}`, {
        "status": "In Progress"
      },{
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
  const markPayed = async (order_id) => {
  const result = await Swal.fire({
    title: 'Are you sure to mark as payed?',
    text: 'Marking this order as payed means the app automatically send order special link to the customers email!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#005cb3ff',
    cancelButtonColor: '#6d6d6dff',
    confirmButtonText: 'Yes, mark as payed!',
    backdrop: true,
    width: '400px',
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/invoice/mark_payed/${order_id}`, {},{
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        Swal.fire('Well done!', 'Order marked as payed,order intent sent to customers email!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong.', 'error');
      console.log(error)
    }
  }
};

  const handleEdit = (order) => {
    console.log("Edit order", order);
  };

  if (loading) return <div className={css.loading}>Loading orders...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.heading}>All Orders</h2>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Order Date</th>
              <th>Received By</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Invoice</th>
              <th>Edit Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>
                 <strong> {order.customer_first_name} {order.customer_last_name}</strong><br />
                  {order.customer_email}<br />
                  {order.customer_phone}
                </td>
                <td>
                  {order.brand} {order.model}<br />
                  {order.year} | {order.color}<br />
                  {order.tag}
                </td>
                <td>{new Date(order.order_created_at).toLocaleDateString()}</td>
                <td>
                  {order.employee_first_name} {order.employee_last_name}<br />
                  {order.employee_email}
                </td>
                <td>${parseFloat(order.order_total_price).toFixed(2)}</td>
                <td>
                  <p className={`${order.status === 'Completed' ? css.completed : order.status === 'In Progress' ? css.inProgress : css.review}`}>{order.status}</p>
                </td>
                <td className={css.actions}>
                  <FaEdit className={css.editIcon} onClick={() => handleEdit(order)} />
                  <FaTrash className={css.deleteIcon} onClick={() => handleDelete(order.order_id)} />
                </td>
                 <td>
                  <p className={css.generate} onClick={() => generateInvoice(order.order_id)}>Generate</p>
                  <p className={css.send} onClick={() => sendInvoice(order.order_id)}>Send</p>
                </td>
                 <td>
                  <p onClick={() => markCompleted(order.order_id)} className={css.mark}>Mark Completed</p>
                  <p onClick={() => markPending(order.order_id)} className={css.progress}>Mark Pending</p>
                  <p onClick={() => markPayed(order.order_id)} className={css.progress}>Mark Payed</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
