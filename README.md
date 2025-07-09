# 🚗 Abe's Garage Full Stack Management System

Welcome to the **Abe's Garage Management System**! 👨‍🔧 This is a full-stack automotive service management solution designed to streamline day-to-day operations at Abe's Garage—from customer intake to employee management, service orders, and beyond.

> 🏁 **Project Status:** In Development | 💼 **Client:** Abe's Garage | 🌐 **Stack:** React + Node.js + MySQL + AWS

---

## 📌 Table of Contents

- [🚀 Introduction](#-introduction)
- [🎯 Goals and Problem Statement](#-goals-and-problem-statement)
- [📊 Business Value](#-business-value)
- [🧠 System Architecture](#-system-architecture)
- [🗂️ Database Design](#-database-design)
- [🔗 API Design](#-api-design)
- [🛠️ Project Setup](#-project-setup)
- [🧑‍💻 Developer Workflow](#-developer-workflow)
- [🌍 Deployment Guide](#-deployment-guide)
- [📈 Project Timeline](#-project-timeline)
- [📎 Appendix & Credits](#-appendix--credits)

---

## 🚀 Introduction

This project was created as a **real-world full-stack development experience**. After months of training in web development technologies, Abe's Garage serves as a capstone project to apply practical skills across:

- **Frontend development**
- **Backend and database design**
- **System architecture**
- **Deployment & DevOps**
- **Business analysis and value delivery**

The aim is to **digitize and automate garage operations** such as service tracking, customer management, employee accounts, and more.

---

## 🎯 Goals and Problem Statement

### 🔍 What We're Solving:

Garage workflows are often manual, inefficient, and lack historical data. This app solves problems like:

- Repeated customer data entry 🚶
- Untracked service history 📉
- Manual receipts 🧾
- Time-consuming phone calls ☎️
- No marketing automation 📢

### 💡 Proposed Solutions:

- Centralized customer & vehicle records
- Digital order tracking with live status
- Role-based employee authentication
- Marketing-ready data collection
- Responsive web portal for customers

---

## 📊 Business Value

💰 This software isn’t just functional—it’s valuable:

- **Returning customers via recall/reminders** → +\$260,000
- **Manager time saved** → +\$16,250
- **Reduced phone inquiries** → +\$7,800
- **Automatic receipt handling** → +\$1,075
- **Customer time saved** → +\$40,625
- **Online discoverability** → +\$120,000

📈 **Estimated Total Value Added in 5 years:** `$445,750`

💸 **Fair market price (20% capture):** `$18,000`

---

## 🧠 System Architecture

- **Frontend:** React.js + Bootstrap
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Hosting:** AWS EC2
- **Version Control:** Git + GitHub
- **Design Pattern:** Microservices (auth, employee, customer, service, order, vehicle)

### 📐 Pages

- Public Pages: `/`, `/services`, `/about`, `/contact`, `/order/:orderHash`
- Admin Dashboard: `/admin/*`
- Customer/Vehicle/Order Management

### 🧱 Architecture Flow

```
Browser ⇄ React (Frontend) ⇄ Express API (Backend) ⇄ MySQL (Database)
```

---

## 🗂️ Database Design

Our database is **highly normalized** to reduce redundancy and ensure scalability.

### 🧑 Employee Tables

- `employee`
- `employee_info`
- `employee_pass`
- `employee_role`
- `company_roles`

### 👥 Customer & Vehicle

- `customer_identifier`
- `customer_info`
- `customer_vehicle_info`

### 🛠️ Services

- `common_services`

### 📦 Orders

- `orders`
- `order_info`
- `order_services`
- `order_status`

All tables follow best practices:

- Foreign key constraints
- Unique identifiers
- Consistent naming
- Proper data types

---

## 🔗 API Design

Following **RESTful principles**, we use a **Design-First approach** with full documentation.

### ✅ Employee Endpoints

- `GET /api/employees`
- `GET /api/employee/:id`
- `POST /api/employee`
- `PUT /api/employee`

### 👤 Customer Endpoints

- `GET /api/customers`
- `GET /api/customer/:id`
- `POST /api/customer`
- `PUT /api/customer`

### 🚘 Vehicle Endpoints

- `GET /api/vehicle/:id`
- `POST /api/vehicle`
- `PUT /api/vehicle`

### 🛠️ Service Endpoints

- `GET /api/services`
- `GET /api/service/:id`
- `POST /api/service`
- `PUT /api/service`

### 📦 Order Endpoints

- `GET /api/orders`
- `GET /api/order/:id`
- `POST /api/order`
- `PUT /api/order`

All requests use JSON with standardized responses and CORS headers enabled.

---

## 🛠️ Project Setup

### 📁 Folder Structure

```
project-root/
├── server/
│   ├── app.js
│   ├── routes/
│   └── controllers/
├── client/
│   └── src/
│       ├── pages/
│       └── components/
├── sql/
│   └── schema.sql
```

### 📦 Tools Required

- Node.js & npm
- MySQL or MAMP
- Git
- AWS EC2 Instance

### 🚀 Setup Steps

1. Clone the repo
2. Set up `.env` for DB credentials
3. Run backend:
   ```bash
   cd backend && npm install && node app.js
   ```
4. Run frontend:
   ```bash
   cd frontend && npm install && npm start
   ```

---

## 👨‍💻 Developer Workflow

### Git Workflow

- Private repo with SSH authentication
- Feature branching & pull requests
- `.gitignore` excludes sensitive files

### Development Flow

1. Build locally (React + Express)
2. Test API with Postman
3. Push to GitHub
4. Deploy to AWS EC2

---

## 🌍 Deployment Guide

### 🖥️ Server Setup (EC2)

- Ubuntu Server (Free tier)
- Open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 4000, 3000
- Installed:
  - MySQL
  - PHPMyAdmin
  - Node.js via NVM
  - PM2 (Process Manager)

### 🛠️ Deployment Steps

- Clone repo on EC2
- Install backend & frontend dependencies
- Change API URLs to production
- Use PM2 for running backend
- Set Apache for serving PHPMyAdmin
- Import DB via terminal or phpMyAdmin

---

## 📈 Project Timeline

| Phase                   | Duration |
| ----------------------- | -------- |
| 🔧 Planning & Design    | 1 Week   |
| 💾 Backend Dev          | 2 Weeks  |
| 🖥️ Frontend Dev         | 2 Weeks  |
| 🧪 Testing & Deployment | 1 Week   |
| 🚀 Post-Launch Support  | Ongoing  |

---

## 📎 Appendix & Credits

### 🎨 Design Tools

- Bootstrap Templates
- Custom UI Wireframes

### 🧠 Contributors

- Architect 👷: Abenezer
- Developer 💻: Abenezer
- Business Analyst 📈: Abenezer
- Tester ✅: Abenezer

### ❤️ Special Thanks

This project was inspired by real challenges in Abe's Garage and guided by practical mentorship and community support.

---

## 🔥 Ready to Transform Auto Services?

This is not just a school project. It’s a professional-grade application built for real-world problems with business-grade impact.

> ⭐ Star the repo | 🛠️ Contribute ideas | 🚗 Drive transformation

---

### 📫 Contact

For feedback, contributions, or project collaborations: **Abenezer Zewge** 🌐 [https://abenezerzewge.com](https://abenezerzewge.com) 📧 [abenezerzewge0@gmail.com](mailto\:abenezerzewge0@gmail.com)

---

*"Software is the silent worker of tomorrow’s industries—let it run your garage today."* 💡

