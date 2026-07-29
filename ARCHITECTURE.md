# Project Architecture

# General Store Inventory Management System

## Overview

The project follows a client-server architecture where the React frontend communicates with the Flask backend using REST APIs.

```
React Frontend
       │
       │ Axios HTTP Requests
       ▼
Flask REST API
       │
       ▼
SQLite Database
```

---

# Frontend Structure

```
src
│
├── components
│   ├── Sidebar.js
│   ├── Navbar.js
│   ├── ErrorBoundary.js
│   └── ProductSkeleton.js
│
├── pages
│   ├── Products.js
│   ├── Sales.js
│   ├── Reports.js
│   ├── SalesHistory.js
│   └── Settings.js
│
├── services
│   ├── api.js
│   ├── productService.js
│   └── dashboardService.js
│
├── Dashboard.js
├── SalesChart.js
├── App.js
└── index.js
```

---

# Backend Structure

```
backend
│
├── app.py
├── requirements.txt
└── database.db
```

---

# Component Hierarchy

```
App

├── Sidebar
├── Navbar
│
├── Dashboard
│      └── SalesChart
│
├── Products
│
├── Sales
│
├── Reports
│
├── SalesHistory
│
└── Settings
```

---

# Data Flow

1. User interacts with the React UI.
2. React calls service functions.
3. Axios sends HTTP requests.
4. Flask processes the request.
5. SQLite stores or retrieves data.
6. Flask returns JSON.
7. React updates the UI.

---

# API Layer

Axios is used to separate API logic from UI components.

Example:

```
Products Component

↓

productService.js

↓

api.js

↓

Flask Backend
```

---

# Performance Optimizations

- Lazy Loading using React.lazy()
- Suspense fallback
- Axios service layer
- useMemo for filtering
- Error Boundary
- Loading Skeleton
- Responsive layout

---

# Design Principles

- Modular architecture
- Separation of concerns
- Reusable components
- Service-based API layer
- Responsive UI
- Maintainable folder structure