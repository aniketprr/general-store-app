# General Store Inventory Management System

A full-stack Inventory Management System developed using **React.js**, **Flask**, and **SQLite** to help manage products, inventory, sales, and reports through a modern dashboard interface.

---

# Project Overview

This application allows store administrators to manage inventory efficiently by providing product management, sales tracking, dashboard analytics, reporting, and inventory monitoring in a responsive web interface.

The project follows a modular frontend architecture with a REST API backend.

---

# Features

- Dashboard with inventory summary
- Product Management (Add, Edit, Delete)
- Product Search
- Product Filtering
- Sales History
- Reports Page
- Settings Page
- Responsive Layout
- Skeleton Loading
- Error Handling
- Toast Notifications
- Debounced Search
- Lazy Loaded Pages
- Code Splitting

---

# Technology Stack

## Frontend

- React.js
- Axios
- React Icons
- React Toastify
- Chart.js
- Recharts

## Backend

- Flask
- SQLite
- Flask REST API

---

# Folder Structure

```
general-store-app/

frontend/
src/
components/
pages/
services/

backend/
app.py
database.db
requirements.txt
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# Environment Variables

Backend

```
PORT=5000
```

Frontend

```
REACT_APP_API_URL=http://localhost:5000
```

---

# API Endpoints

## Products

GET

```
/products
```

POST

```
/products
```

PUT

```
/products/:id
```

DELETE

```
/products/:id
```

---

## Dashboard

GET

```
/dashboard
```

---

# Deployment

Frontend

(Add your Vercel URL here)

Backend

(Add your Render URL here)

---

# Design Decisions

- Component-based architecture
- Service layer for API communication
- Reusable UI components
- Error Boundary for crash recovery
- Skeleton loading for better UX
- Debounced search for improved performance

---

# Known Limitations

- No authentication system
- Search is client-side
- Offline mode not implemented
- Analytics not implemented
- React Router not yet integrated

---

# Testing

- Manual CRUD testing
- Dashboard verification
- Product search testing
- Responsive layout testing
- Error handling verification

---

# Future Improvements

- React Router
- Progressive Web App (PWA)
- Authentication & Authorization
- Analytics Dashboard
- Server-side Search
- Pagination
- Product Comparison
- Dark Mode
- Multi-user Support

---

# Author

Aniket Pardeshi
