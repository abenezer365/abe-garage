import React from 'react';
import css from './Home.module.css';
import {
  PieChart, Pie, Cell,   BarChart,  LineChart, RadialBarChart, RadialBar, ComposedChart, Line, Bar,   Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 

function Home() {
  const data = {
    employees: [
      { id: 1, name: 'Abel', role: 'Mechanic' },
      { id: 2, name: 'Sara', role: 'Receptionist' },
      { id: 3, name: 'Miki', role: 'Cleaner' },
      { id: 4, name: 'Bereket', role: 'Technician' }
    ],
    customers: [
      { id: 1, name: 'Daniel', vehicle: 'Toyota Corolla' },
      { id: 2, name: 'Marta', vehicle: 'Hyundai Elantra' },
      { id: 3, name: 'Jonas', vehicle: 'Suzuki Swift' },
      { id: 4, name: 'Selam', vehicle: 'Honda CR-V' },
      { id: 5, name: 'Binyam', vehicle: 'Toyota Hilux' }
    ],
    orders: [
      { id: 1, customer: 'Daniel', type: 'Oil Change', amount: 500 },
      { id: 2, customer: 'Marta', type: 'Brake Repair', amount: 1500 },
      { id: 3, customer: 'Jonas', type: 'AC Fix', amount: 700 },
      { id: 4, customer: 'Selam', type: 'Engine Diagnostic', amount: 1000 }
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 4500 },
      { month: 'Feb', revenue: 6200 },
      { month: 'Mar', revenue: 7300 },
      { month: 'Apr', revenue: 8000 },
      { month: 'May', revenue: 6700 },
      { month: 'Jun', revenue: 9200 }
    ]
  };
  
  const employeeRoleData = [
    { role: 'Mechanic', count: 3 },
    { role: 'Receptionist', count: 2 },
    { role: 'Cleaner', count: 1 },
    { role: 'Technician', count: 2 },
  ];
  const pieData = data.orders.map(order => ({
    name: order.type,
    value: order.amount
  }));
  
  const ordersRevenueData = [
    { name: 'Daniel', orders: 1, revenue: 500 },
    { name: 'Marta', orders: 1, revenue: 1500 },
    { name: 'Jonas', orders: 1, revenue: 700 },
    { name: 'Selam', orders: 1, revenue: 1000 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={css.dash}>
      <div className={css.chartsGrid}>

        {/* Pie Chart */}
        <div className={css.card}>
          <h3>Orders by Type</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className={css.card}>
          <h3>Total Customers</h3>
          <BarChart width={250} height={250} data={[{ name: 'Customers', total: data.customers.length }]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className={css.card}>
          <h3>Monthly Revenue</h3>
          <LineChart width={250} height={250} data={data.revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Radial Chart */}
        <div className={css.card}>
          <h3>Workshop Efficiency</h3>
          <RadialBarChart
            width={250}
            height={250}
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
              fill="#8884d8"
            />
            <Tooltip />
          </RadialBarChart>
        </div>
              <div className={css.card}>
  <h3>Employee Roles</h3>
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart data={employeeRoleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="role" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>
</div>
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
