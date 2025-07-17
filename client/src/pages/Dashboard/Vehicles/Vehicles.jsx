import React, { useEffect, useState } from 'react';
import css from './Vehicles.module.css';
import axios from '../../../utils/axios.instance';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('/vehicle/vehicles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
        setVehicles(res.data.vehicles);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success', // or 'error', 'info', 'warning'
          title: 'Vehicle loaded successfully!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const handleDelete = async (vehicle_id) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ee0d09ff',
        cancelButtonColor: '#091436',
        confirmButtonText: 'Yes, delete it!',
        backdrop: true,
        width: '400px',
    });

    if (result.isConfirmed) {
        try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/vehicle/delete/${vehicle_id}`, {
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


  const handleEdit = (order) => {
    console.log("Edit order", order);
  };

  if (loading) return <div className={css.loading}>Loading vehicles...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.heading}>All Vehicles</h2>

      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Serial</th>
              <th>Color</th>
              <th>Mileage</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map((vehicle, index) => (
              <tr key={vehicle.vehicle_id}>
                <td>{index + 1}</td>
                <td>
                  <strong>{vehicle.first_name} {vehicle.last_name}</strong><br />
                  {vehicle.email}
                </td>
                <td>
                  {vehicle.brand} {vehicle.model}<br />
                  {vehicle.year} | {vehicle.type}
                </td>
                <td>{vehicle.serial}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.mileage} km</td>
                <td>{vehicle.tag}</td>
                <td className={css.actions}>
                  <FaEdit className={css.editIcon} onClick={() => handleEdit(vehicle)} />
                  <FaTrash className={css.deleteIcon} onClick={() => handleDelete(vehicle.vehicle_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Vehicles;
