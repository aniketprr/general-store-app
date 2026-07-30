# Architecture Report

# General Store Inventory Management System

---

# 1. Project Architecture

The application follows a client-server architecture consisting of:

Frontend (React)

↓

REST API (Flask)

↓

SQLite Database

The React frontend communicates with the Flask backend through REST API endpoints using Axios. The backend performs CRUD operations on the SQLite database and returns JSON responses.

---

# 2. Folder Structure

```
general-store-app/

backend/
    app.py
    requirements.txt
    database.db

frontend/
    src/
        components/
        pages/
        services/
        App.js
        Dashboard.js
        Navbar.js
```

---

# 3. Component Organization

The frontend is organized into reusable UI components.

Examples include:

- Sidebar
- Navbar
- Dashboard
- Sales Chart
- Product Skeleton
- Error Boundary

Pages are separated into:

- Dashboard
- Products
- Sales
- Reports
- Sales History
- Settings

This separation improves maintainability and code readability.

---

# 4. State Management

React Hooks were selected because the application is medium-sized and does not require a global state library.

The project uses:

- useState
- useEffect
- useMemo

Local component state keeps the application simple and easy to understand.

If the application grows significantly, Context API or Redux Toolkit would be considered.

---

# 5. Why React Hooks?

React Hooks were chosen because they:

- Reduce boilerplate code
- Improve readability
- Simplify state management
- Support reusable logic
- Eliminate the need for class components

---

# 6. Why React Router Was Not Used

Navigation is currently managed using component state (`activePage`).

Advantages:

- Simple implementation
- Suitable for a small application
- Minimal configuration

Limitations:

- No bookmarkable URLs
- No browser history support
- No route protection
- Limited scalability

Future versions will migrate to React Router for improved navigation.

---

# 7. Data Fetching Strategy

Axios is used as a centralized API client.

Advantages:

- Centralized configuration
- Easy base URL management
- Cleaner API calls
- Easier backend replacement

Each feature uses service files to separate UI logic from API communication.

---

# 8. API Contract Design

The current backend returns product data as arrays.

Example:

```json
[1, "Milk", "Dairy", 20, 50]
```

This approach works but creates tight coupling between frontend and backend.

A better API design would return objects:

```json
{
  "id": 1,
  "name": "Milk",
  "category": "Dairy",
  "quantity": 20,
  "price": 50
}
```

This would improve readability, maintainability, and scalability.

---

# 9. Performance Optimizations

The application includes several optimizations:

- Lazy loading
- Code splitting
- Memoization
- Debounced search
- Skeleton loading
- Efficient component rendering

These techniques reduce unnecessary rendering and improve user experience.

---

# 10. Error Handling

The application includes:

- Error Boundary
- Toast notifications
- Loading indicators
- Skeleton screens
- Friendly error messages

These features improve application reliability.

---

# 11. Caching Strategy

Currently:

- API responses are fetched from the backend when required.
- React memoization reduces unnecessary recalculations.

Future improvements include:

- Service Worker
- Offline caching
- IndexedDB
- Browser cache strategies

---

# 12. Security Considerations

Current implementation includes:

- Frontend validation
- REST API communication
- Controlled form inputs

Future improvements:

- JWT authentication
- Role-based authorization
- HTTPS enforcement
- Rate limiting
- Input sanitization
- CSRF protection

---

# 13. Testing Approach

The project was tested manually by verifying:

- Product CRUD operations
- Dashboard updates
- Search functionality
- Responsive layout
- Error handling
- API communication

Future improvements include:

- Unit testing
- Integration testing
- End-to-end testing

---

# 14. Trade-offs

Several design decisions prioritized simplicity over complexity.

Examples:

- State-based navigation instead of React Router
- Local state instead of Redux
- SQLite instead of PostgreSQL
- Client-side search instead of server-side search

These decisions reduced complexity while keeping the application maintainable for the current project scope.

---

# 15. Future Scaling Plan

For a production-scale deployment, the following improvements are recommended:

- React Router
- PostgreSQL or MySQL
- Authentication and authorization
- Server-side search
- Pagination
- Analytics
- Progressive Web App (PWA)
- Offline support
- Multi-user support
- Docker deployment
- CI/CD pipeline

---

# 16. Database Migration

SQLite is suitable for development and small-scale deployments.

For larger deployments, the backend can migrate to PostgreSQL or MySQL with minimal frontend changes because API communication is abstracted through the service layer.

---

# 17. Multi-user Concurrency

SQLite has limited support for concurrent writes.

For production systems with multiple users, PostgreSQL would provide:

- Better concurrency
- Transactions
- Lock management
- Scalability
- Reliability

---

# Conclusion

The application follows a modular full-stack architecture using React, Flask, and SQLite. While the current implementation is suitable for a small-to-medium inventory management system, the architecture has been designed so that future enhancements such as routing, authentication, scalable databases, analytics, and offline capabilities can be introduced with minimal impact on the overall structure.
