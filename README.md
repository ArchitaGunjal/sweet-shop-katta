🍬 Sweet Shop Management System

A full-stack, TypeScript-based inventory management system for a boutique sweet shop. This application features secure role-based authentication, real-time inventory tracking, and a modern, responsive dashboard.

🚀 Features

Core Functionality

User Authentication: Secure Registration and Login using JWT and BCrypt.

Role-Based Access: Distinct capabilities for Users (Browse, Purchase) vs Admins (Manage Inventory).

Inventory Management:

Atomic Transactions: Prevents race conditions when multiple users purchase the same item.

Stock Tracking: Visual indicators for low stock and out-of-stock items.

Search & Filter: Instant search for sweets by name or category.

Tech Stack

Backend: Node.js, Express, TypeScript, Prisma (SQLite), Jest (TDD).

Frontend: React, Vite, Tailwind CSS, Lucide Icons.

Design: Mobile-first, responsive UI with a warm, appetizing color palette.

📸 Screenshots

User Experience

Login Page

User Dashboard

![Login Page](screenshots/desktop-2-login.png)

![User Dashboard](screenshots/desktop-3-dashboard.png)



Features

Search & Filter

User Profile

![Search Interface](screenshots/desktop-4-search.png)

![User Profile](screenshots/desktop-5-profile.png)



Admin & Mobile Responsiveness

Admin Inventory

Mobile Dashboard

![Admin Panel](screenshots/desktop-6-admin.png)

![Mobile View](screenshots/mobile-3-dashboard.png)



🛠️ Setup & Installation

Prerequisites

Node.js (v18 or higher)

npm

1. Backend Setup

The backend runs on port 3000.

cd sweet-shop-backend
npm install
# Initialize Database
npx prisma migrate dev --name init
# Optional: Seed Data with demo sweets
npx ts-node prisma/seed.ts
# Start Server
npm run dev



2. Frontend Setup

The frontend runs on port 5173 and proxies API requests to the backend.

cd sweet-shop-frontend
npm install
# Start UI
npm run dev



Access the app at: http://localhost:5173

🧪 Testing & Quality Assurance

The backend follows strictly Test-Driven Development (TDD).

Running Tests

To run the full suite:

cd sweet-shop-backend
npm test



Current Status: 🟢 15/15 Tests Passing (Auth, Inventory, Logic).
See test_report.txt for the detailed output.

🤖 My AI Usage

In compliance with the assignment's AI Policy, I transparently document my collaboration with AI tools below.

Tools Used

GitHub Copilot / Gemini: Used as a pair programmer for boilerplate generation, refactoring, and debugging.

Playwright: Used to automate the capture of high-quality screenshots for documentation.

Specific Applications

TDD Workflow: I used AI to generate the "Red" (failing) test cases based on the requirements before writing the implementation logic. This ensured I adhered to strict TDD without getting bogged down in Jest syntax.

Design System: I leveraged AI to generate the Tailwind CSS configuration and color palette (orange-500, stone-50) to create a cohesive "Warm" theme quickly.

Debugging: AI assisted in resolving a specific version mismatch with Tailwind v4, suggesting a downgrade to v3 stable.

Reflection

AI significantly accelerated the setup phase (scaffolding the Monorepo structure) and the styling phase. However, the core business logic—specifically the atomic decrement for inventory and the permission middleware—was verified manually to ensure correctness and security.

