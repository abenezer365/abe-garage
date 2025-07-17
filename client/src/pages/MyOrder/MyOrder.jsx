import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MyOrder.module.css';
import axios from '../../utils/axios.instance';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MyOrder() {
  const { order_hash } = useParams();
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOrder() {
      try{
       const token = localStorage.getItem("token");
        const res = await axios.get(`/order/my_order/${order_hash}`, {headers: { Authorization: `Bearer ${token}`}});
        if(res.data.success){
          setOrder(res.data.order);
          setServices(res.data.services);
        }else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Invalid order link!',
            showConfirmButton: true,
            timerProgressBar: true
            });
          navigate(navigate)
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'error',
            title: 'Invalid order link!',
            showConfirmButton: true,
            timerProgressBar: true
        });
      }
    }

    fetchOrder();
  }, [order_hash]);


  return (
    <div className={css.wrapper}>
      <div className={css.heading}>🚘 Order Status</div>

      <div className={css.section}>
        <p>
            <span className={css.label}>Status:</span>
            <span className={
              order?.status === 'Completed'
                ? css.completed
                : order?.status === 'In Progress'
                  ? css.inProgress
                  : css.review
            }>
              {order?.status}
            </span>
          </p>
       <p><span className={css.label}>Estimated Completion:</span> <span className={css.value}>{order?.order_estimated_completion_date}</span></p>
        <p><span className={css.label}>Total Price:</span> <span className={css.value}>${order?.order_total_price}</span></p>
      </div>

      <div className={css.section}>
        <h3>👤 Customer Info</h3>
        <p><span className={css.label}>Name:</span> <span className={css.value}>{order?.first_name} {order?.last_name}</span></p>
        <p><span className={css.label}>Email:</span> <span className={css.value}>{order?.email}</span></p>
        <p><span className={css.label}>Phone:</span> <span className={css.value}>{order?.phone}</span></p>
      </div>

      <div className={css.section}>
        <h3>🚗 Vehicle Info</h3>
        <p><span className={css.label}>Vehicle:</span> <span className={css.value}>{order?.brand} {order?.type} {order?.year}</span></p>
        <p><span className={css.label}>Color:</span> <span className={css.value}>{order?.color}</span></p>
      </div>

      <div className={css.section}>
        <h3>🛠️ Services</h3>
        <div className={css.serviceList}>
          {services?.map((s, i) => (
            <span key={i} className={css.serviceItem}>{s}</span>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3>📎 Additional Notes</h3>
        <p>{order?.order_additional_requests || "No additional requests."}</p>
      </div>
    </div>
  );
}

export default MyOrder;
