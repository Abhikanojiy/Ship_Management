# 🚢 Ship Maintenance Dashboard

A responsive, role-based dashboard for managing ships, components, and maintenance jobs. Built using **React** with **Context API**, the app simulates a realistic internal tool for ENTNT using only **localStorage** for data persistence. No backend or external API is used.

## 🔗 Live Demo

**Deployed Link:** fluffy-kitten-832a81.netlify.app

---

## 🛠 Features

### 🔐 User Authentication (Simulated)
- Hardcoded users (Admin, Inspector, Engineer)
- Login via email/password
- Role-based access control
- Session persistence using localStorage

### 🚢 Ships Management
- View, Create, Edit, Delete ships
- Ship profile includes general info, maintenance history, and components

### ⚙️ Ship Components
- Add/Edit/Delete components linked to ships
- View component details (Name, Serial Number, Install Date, Last Maintenance)

### 🛠 Maintenance Jobs
- Create jobs for components (Type, Priority, Status, Assigned Engineer)
- Filter by Ship, Priority, Status
- Update job statuses as they progress

### 📅 Maintenance Calendar
- Calendar view (Monthly/Weekly) of scheduled jobs
- Click on a date to view scheduled jobs

### 🔔 Notification Center
- In-app notifications for job creation, updates, and completion
- Notifications are dismissible

### 📊 KPIs Dashboard
- Cards showing:
  - Total ships
  - Components with overdue maintenance
  - Jobs in progress
  - Jobs completed
- Basic charts for visual analytics

---

## 🧱 Tech Stack

- **React (Vite)**
- **Context API** for global state
- **React Router** for navigation
- **Tailwind CSS** for styling
- **localStorage** for data simulation and persistence
- **date-fns** for date handling
- **react-calendar** for calendar view

---


