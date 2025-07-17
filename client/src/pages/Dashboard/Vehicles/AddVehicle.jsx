import React, { useRef, useState, useEffect } from 'react';
import css from './AddVehicle.module.css';
import axios from '../../../utils/axios.instance';
import Swal from 'sweetalert2';

function AddVehicle() {
  const customerIdRef = useRef();
  const yearRef = useRef();
  const brandRef = useRef();
  const modelRef = useRef();
  const typeRef = useRef();
  const mileageRef = useRef();
  const tagRef = useRef();
  const serialRef = useRef();
  const colorRef = useRef();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('/customer/customers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setCustomers(res.data.customers);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Unable to load customers!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.log(error);
      }
    }
    fetchCustomers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const vehicleData = {
      customer_id: customerIdRef.current.value,
      year: parseInt(yearRef.current.value),
      brand: brandRef.current.value,
      model: modelRef.current.value,
      type: typeRef.current.value,
      mileage: parseInt(mileageRef.current.value),
      tag: tagRef.current.value,
      serial: serialRef.current.value,
      color: colorRef.current.value,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('/vehicle/add_vehicle', vehicleData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        e.target.reset();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Vehicle added successfully!',
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.container}>
      <h2 className={css.heading}>Add New Vehicle</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <select ref={customerIdRef} required>
          <option value="">Select Owner</option>
          {customers.map((customer, i) => (
            <option key={i} value={customer.customer_id}>
             {customer.first_name} {customer.last_name} ({customer.email})
            </option>
          ))}
        </select>

        <input ref={yearRef} type="number" placeholder="Year" required />
        <input ref={brandRef} type="text" placeholder="Brand" required />
        <input ref={modelRef} type="text" placeholder="Model" required />
        <input ref={typeRef} type="text" placeholder="Type (e.g., SUV)" required />
        <input ref={mileageRef} type="number" placeholder="Mileage" required />
        <input ref={tagRef} type="text" placeholder="Tag (e.g., CERTIFIED_PREOWNED)" required />
        <input ref={serialRef} type="text" placeholder="Serial Number" required />
        <input ref={colorRef} type="text" placeholder="Color" required />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
}

export default AddVehicle;
