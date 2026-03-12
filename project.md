You are a **Senior Software Architect building a production-grade full stack e-commerce platform**.

Generate a **complete working project**, not a UI mock.

Stack:

Frontend
• Vite
• React
• JSX
• TailwindCSS
• Zustand for state management
• React Router

Backend
• Node.js
• Express.js
• MongoDB
• Mongoose
• JWT Authentication

The system must behave like a **real marketplace similar to Amazon / Flipkart / Meesho**.

Everything must be **fully functional**, not static UI.

---

# USER ROLES

The platform must support **two completely different roles**.

### Customer

Customers can:

• Register
• Login
• Browse products
• Search products
• Filter products
• View product details
• Add to cart
• Remove from cart
• Update quantity
• Checkout
• Place orders
• View order history
• Wishlist products

---

### Vendor

Vendors are sellers who can manage their store.

Vendors can:

• Register as vendor
• Login as vendor
• Create products
• Edit products
• Delete products
• Upload product images
• View orders for their products
• Manage inventory
• View sales dashboard

---

# DESIGN REQUIREMENTS

Follow the UI design from the provided reference.

Palette:

Primary Button: #8586fa
Shadow: #dadceb → #ebebf4
Card: #f0eff7
Background: #f8f6fc
Feature Cards: #f2f0f6
Navbar: #f3f2f6
Border: #e6e4ea
Icons: #989abc

Design must be:

• minimalistic
• premium
• visually satisfying
• smooth animations
• soft shadows
• elegant typography
• balanced whitespace

---

# IMPORTANT ENGINEERING RULES

Follow these strictly.

1. Apply **OOP concepts everywhere**
2. Follow **SOLID principles**
3. Use **modular architecture**
4. Separate logic into **controllers, services, repositories**
5. Avoid duplication
6. Write **clean code without comments**
7. Ensure **full responsiveness**
8. Every file must have **single responsibility**

---

# CUSTOMER FEATURES

Product browsing
Product search
Filters

Example filters:

• category
• price range
• rating
• availability

Cart system

• add item
• remove item
• update quantity

Orders

• checkout
• order history

---

# VENDOR FEATURES

Vendor dashboard must include:

• product list
• create product
• edit product
• delete product
• view orders
• inventory tracking

---

# DATABASE MODELS

User
Product
Order
Cart

Product must contain:

• name
• description
• price
• category
• stock
• vendorId
• images
• rating

---

# FRONTEND ROUTING

Use **React Router**.

Routes:

/
/home
/products
/product/:id
/cart
/login
/register
/vendor/login
/vendor/dashboard
/vendor/products

---

# RESPONSIVENESS

The entire application must be **fully responsive**.

Use:

• Tailwind responsive breakpoints
• CSS Grid
• Flexbox

Cards must stack properly on mobile.

Navbar must convert to **mobile menu**.

---

# FINAL OUTPUT

Generate a **fully functional project**.

Include:

• working API
• working UI
• navigation between pages
• functional cart
• vendor dashboard
• product filters
• database models
• authentication system

The application must behave like a **real e-commerce marketplace**, not a UI demo.
