# AI Report

## Project

General Store Inventory Management System

---

# AI Tools Used

The following AI tools were used during development:

- ChatGPT (Primary development assistant)
- GitHub Copilot (Code suggestions)
- Online documentation (React, Flask, Axios)

---

# Purpose of AI Usage

AI was used to:

- Generate React components
- Generate Flask API examples
- Debug frontend errors
- Improve UI consistency
- Create documentation
- Optimize search functionality
- Improve performance
- Implement error handling

---

# Prompts Used

Some of the prompts used during development included:

- Create a React inventory management dashboard.
- Design an enterprise-style dashboard UI.
- Create reusable React components.
- Fix Axios API integration errors.
- Implement CRUD operations using Flask.
- Improve loading states using skeleton components.
- Add debounced product search.
- Improve accessibility using ARIA labels.
- Generate Architecture documentation.
- Generate project README.

---

# Incorrect AI Responses

During development, AI occasionally produced incorrect or incomplete solutions.

Examples include:

### Example 1

Suggested incorrect Axios imports that resulted in API methods not being available.

Issue:

api.get is not a function

Manual Fix:

Verified the Axios instance and corrected the import/export statements.

---

### Example 2

Generated JSX formatting that caused parsing errors.

Issue:

Unexpected token


Manual Fix:

Rewrote the affected components using valid JSX syntax.

---

### Example 3

Suggested placing debounced search logic inside the Products component.

Issue:

The search input was actually located inside the Navbar component.

Manual Fix:

Moved the debounce implementation to Navbar where the input is rendered.

---

### Example 4

Generated incorrect ErrorBoundary integration.

Issue:

Component has no default export


Manual Fix:

Corrected exports and restored the ErrorBoundary implementation.

---

# Bugs Introduced During Development

Some bugs encountered included:

- Incorrect React imports
- Dashboard service import errors
- Product service import errors
- API response handling issues
- JSX syntax errors
- Component export mistakes
- State synchronization problems
- Search integration bugs

---

# Manual Fixes Performed

The following corrections were completed manually:

- Fixed React imports
- Corrected Axios service layer
- Improved component structure
- Fixed dashboard rendering
- Corrected product loading
- Implemented debounced search
- Added skeleton loading
- Improved error handling
- Updated documentation

---

# Lessons Learned

This project helped improve understanding of:

- React Hooks
- Component architecture
- API integration
- Error boundaries
- State management
- Debounced search
- Frontend debugging
- Performance optimization
- Documentation practices
- Working with AI-generated code responsibly

---

# Reflection

AI significantly accelerated development by assisting with code generation and debugging.

However, AI-generated code was always manually reviewed, tested, and corrected where necessary. This project demonstrated that AI is most effective as a development assistant rather than a replacement for engineering judgment.

