````md
<div align="center">

# 🍭 Sweet Shop Management System

**AI Kata Project Submission — TDD-Driven Full-Stack Inventory System**

A **strictly typed**, **test-driven**, and **secure** sweet shop inventory management platform showcasing modern backend engineering, clean frontend design, and **transparent AI-assisted development**.

---

🎯 **About** • ✨ **Features** • 📸 **Gallery** • 🛠️ **Tech Stack** • 🚀 **Setup** • 🧪 **TDD** • 🤖 **AI Disclosure**

<br />

<img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square" />
<img src="https://img.shields.io/badge/TDD-Red–Green–Refactor-success?style=flat-square" />
<img src="https://img.shields.io/badge/Auth-JWT-orange?style=flat-square" />
<img src="https://img.shields.io/badge/ORM-Prisma-lightgrey?style=flat-square" />
<img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blueviolet?style=flat-square" />

</div>

---

## 🎯 About the Kata

This project was built as part of the **"TDD Kata: Sweet Shop Management System"** assignment.

The goal was to design and implement a **robust full-stack application** while strictly adhering to:

- **Test-Driven Development (TDD)**
- **Secure RESTful API principles**
- **Role-based authorization**
- **Transparent AI usage & documentation**

---

## ✅ Deliverables Checklist

| Requirement       | Status | Implementation Details |
|------------------|--------|------------------------|
| Backend API       | ✅ | Node.js + Express REST API, JWT Auth, Prisma (SQLite) |
| Frontend SPA      | ✅ | React (Vite) with Mobile-First Tailwind UI |
| TDD Workflow      | ✅ | Red → Green → Refactor methodology |
| AI Transparency   | ✅ | Full disclosure & co-authorship tracking |

---

## ✨ Key Features

### 🔐 Security & Role-Based Access

- **JWT Authentication**  
  Stateless and secure login / registration system.

- **Granular Permissions**
  - **Shoppers**: Browse sweets, filter by category/price, purchase items
  - **Admins**: Add products, restock inventory, delete items

---

### 📦 Inventory Engine

- **Atomic Transactions**  
  Prevents race conditions (e.g., concurrent purchases of the last item) using **Prisma transactions**.

- **Smart Search**  
  Real-time filtering by:
  - Name
  - Category
  - Price range

- **Stock Indicators**
  - 🟡 Low Stock (< 5)
  - 🔴 Out of Stock

---

### 🎨 Modern User Experience

- **Mobile-First Design**  
  Fully responsive UI built with **Tailwind CSS**.

- **Instant Feedback**  
  Toast notifications for purchases, stock errors, and admin actions.

- **Optimized Performance**  
  Vite-powered frontend with sub-second load times.

---

## 📸 Application Gallery

<div align="center">

### 🔑 Authentication & Dashboard
<img src="screenshots/desktop-2-login.png" width="400" alt="Login Page" />
<img src="screenshots/desktop-3-dashboard.png" width="400" alt="User Dashboard" />

<br />

### 🔍 Search & Admin Inventory
<img src="screenshots/desktop-4-search.png" width="400" alt="Search Interface" />
<img src="screenshots/desktop-6-admin.png" width="400" alt="Admin Panel" />

<br />

### 📱 Mobile & Profile Views
<img src="screenshots/mobile-3-dashboard.png" width="200" alt="Mobile View" />
<img src="screenshots/desktop-5-profile.png" width="400" alt="User Profile" />

</div>

---

## 🛠️ Tech Stack

| Domain      | Technologies |
|------------|-------------|
| **Backend** | Node.js, Express, TypeScript, BCrypt, JSON Web Token |
| **Database** | SQLite (Dev), Prisma ORM |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Axios |
| **Testing** | Jest (Logic), Supertest (API Integration) |
| **DevOps** | ESLint, Prettier, Concurrently |

---

## 🚀 Setup & Installation

### 🔧 Prerequisites

- Node.js **v18+**
- npm

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/sweet-shop-system.git
cd sweet-shop-system
````

---

### 2️⃣ Backend Setup

Backend runs on **[http://localhost:3000](http://localhost:3000)**

```bash
cd sweet-shop-backend

npm install

# Environment variables
echo "PORT=3000" >> .env
echo "DATABASE_URL='file:./dev.db'" >> .env
echo "JWT_SECRET='super-secret-key'" >> .env

# Migrate database
npx prisma migrate dev --name init

# Seed demo data
npx ts-node prisma/seed.ts

# Start server
npm run dev
```

---

### 3️⃣ Frontend Setup

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

```bash
cd sweet-shop-frontend

npm install
npm run dev
```

> ℹ️ The frontend proxies API requests to `http://localhost:3000` to avoid CORS issues.

---

## 🧪 Test-Driven Development (TDD)

This project strictly follows **TDD**, with tests written **before** implementation code.

### ▶ Run Test Suite

```bash
cd sweet-shop-backend
npm test
```

**Current Status:** 🟢 **15 / 15 Tests Passing**

✔ JWT authentication & role middleware
✔ Inventory atomic decrement logic
✔ Full REST API integration flows

---

## 🤖 AI Usage Disclosure

This project complies fully with the **AI Usage Policy** by documenting how AI tools were used.

### 🛠️ Tools Used

* **GitHub Copilot / Gemini**
  Used as a *pair programmer* for boilerplate generation and debugging.

* **Playwright**
  Automated screenshot generation for documentation.

---

### 📝 AI Contribution Log

| Area          | Usage Description                                      | Impact       |
| ------------- | ------------------------------------------------------ | ------------ |
| TDD Workflow  | Generated failing (“Red”) test cases from requirements | **High**     |
| Design System | Generated Tailwind theme (warm palette)                | Medium       |
| Debugging     | Identified Tailwind v3/v4 mismatch                     | **High**     |
| Git History   | Co-authored commits tagged where applicable            | Transparency |

**Reflection:**
AI significantly accelerated scaffolding and setup. However, **core business logic**—especially inventory race-condition handling and permission middleware—was **manually verified** to ensure correctness and security.

---

<div align="center">

### Made with 🍭, TypeScript, and disciplined TDD

</div>
```
