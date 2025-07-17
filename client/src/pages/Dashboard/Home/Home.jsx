import React, { useEffect, useState } from 'react';
import css from './Home.module.css';
import {
  PieChart, Pie, Cell, BarChart, LineChart, RadialBarChart,
  RadialBar, ComposedChart, Line, Bar, Legend, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from '../../../utils/axios.instance';

function Home() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function loadData() {
      try {
        const [custRes, orderRes, vehicleRes, employeeRes] = await Promise.all([
          axios.get('/customer/customers', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/order/orders', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/vehicle/vehicles', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/user/users', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setCustomers(custRes.data.customers);
        setOrders(orderRes.data.orders);
        setVehicles(vehicleRes.data.vehicles);

        // Employee role count
        const roleCount = {};
        employeeRes.data.users.forEach(user => {
          roleCount[user.role] = (roleCount[user.role] || 0) + 1;
        });
        const formattedRoles = Object.keys(roleCount).map(role => ({ role, count: roleCount[role] }));
        setEmployeeRoles(formattedRoles);

        // Mocked revenue per month
        const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        const revData = monthMap.map(month => ({
          month,
          revenue: Math.floor(Math.random() * 10000) + 3000
        }));
        setRevenueData(revData);

      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
    }

    loadData();
  }, []);

  // Pie chart (fallback if service name missing)
  const pieData = orders.map((order, i) => ({
    name: order.service_name || order.service_type || `Service ${i + 1}`,
    value: parseFloat(order.order_total_price) || 1000
  }));

  // Composed chart
  const ordersRevenueData = orders.slice(0, 6).map((order, i) => ({
    name: order.customer_name || `Customer ${i + 1}`,
    orders: 1,
    revenue: parseFloat(order.order_total_price) || 1000
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={css.dash}>
      <div className={css.chartsGrid}>

        {/* Pie Chart */}
        <div className={css.card}>
          <h3>Orders by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className={css.card}>
          <h3>Total Customers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[{ name: 'Customers', total: customers.length }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className={css.card}>
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        <div className={css.card}>
          <h3>Workshop Efficiency</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={450}
              data={[{ name: 'Progress', value: 78 }]}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                fill="#6a67a8"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className={css.card}>
          <h3>Employee Roles</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={employeeRoles}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Composed Chart */}
        <div className={css.card}>
          <h3>Orders vs Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={ordersRevenueData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
