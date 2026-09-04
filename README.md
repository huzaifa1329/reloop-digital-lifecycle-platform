# ♻️ ReLoop — Digital Product Lifecycle Platform

> **Don't Replace It. Give It Another Life.**

ReLoop is a full-stack digital product lifecycle management platform built to help users manage electronic products beyond the initial purchase.

The platform brings product registration, Digital Product Passports, product health tracking, repair services, resale, donation, recycling, notifications, and role-based management into one connected ecosystem.

---

## 🌐 Live Demo

### Frontend
https://reloop-digital-lifecycle-platform.vercel.app

### Backend API
https://reloop-backend-mu.vercel.app

### API Health Check
https://reloop-backend-mu.vercel.app/api/health

### GitHub Repository
https://github.com/huzaifa1329/reloop-digital-lifecycle-platform

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Objectives](#-objectives)
- [Key Features](#-key-features)
- [Product Lifecycle](#-product-lifecycle)
- [User Roles](#-user-roles)
- [System Workflows](#-system-workflows)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Database Design](#-database-design)
- [Authentication & Authorization](#-authentication--authorization)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Demo Accounts](#-demo-accounts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Project Information](#-project-information)
- [Author](#-author)
- [License](#-license)

---

# 🚀 Overview

ReLoop is a MERN-based web application designed around the complete lifecycle of electronic products.

Instead of treating a product as something that is simply purchased and eventually discarded, ReLoop provides a platform for users to:

- Register electronic products
- Create and manage Product Passports
- Monitor product condition and health
- Track product lifecycle status
- Request repair services
- Select verified repair partners
- List products for resale
- Manage marketplace listings
- Donate products
- Request responsible recycling
- Receive lifecycle and platform notifications

The platform provides dedicated experiences for:

- Customers
- Repair Partners
- Administrators

---

# ❗ Problem Statement

Electronic products are frequently replaced instead of being repaired, reused, resold, donated, or recycled.

This creates several challenges:

- Limited visibility into product history
- Poor maintenance tracking
- Difficulty finding trusted repair services
- Limited resale transparency
- Product information scattered across different systems
- Lack of centralized lifecycle management
- Shorter useful product lifespans
- Increasing electronic waste

Most traditional e-commerce platforms primarily focus on buying and selling.

**ReLoop focuses on what happens before, between, and after those stages.**

---

# 💡 Solution

ReLoop provides a centralized digital platform that connects the major activities involved in an electronic product's lifecycle.

The platform connects:

**Customers + Products + Repair Partners + Marketplace + Administration**

into a single ecosystem.

The core concept is:

> **Keep products useful for longer instead of replacing them unnecessarily.**

---

# 🎯 Objectives

The main objectives of ReLoop are:

1. Provide centralized product lifecycle management.
2. Provide a Digital Product Passport for registered products.
3. Allow users to manage product information and condition.
4. Calculate and display product health information.
5. Connect customers with verified repair partners.
6. Provide a controlled marketplace for product resale.
7. Allow administrators to approve marketplace listings.
8. Support product donation workflows.
9. Support responsible recycling workflows.
10. Provide role-based dashboards.
11. Implement secure authentication and authorization.
12. Provide real-time API-based data synchronization.
13. Store application data using MongoDB.
14. Deploy the full-stack application to production.

---

# ✨ Key Features

## 👤 Customer Features

Customers can:

- Register an account
- Verify their email
- Log in securely
- Recover forgotten passwords
- Register products
- Upload product images
- View product information
- View Product Passports
- Monitor product health
- View product lifecycle information
- Request repairs
- Select repair partners
- Manage repair requests
- Create marketplace listings
- Manage their listings
- Contact sellers through marketplace messaging
- Submit donation requests
- Submit recycling requests
- View notifications
- Manage profile information
- Manage account preferences
- View personal analytics

---

## 🔧 Repair Partner Features

Repair Partners can:

- Register as a repair service provider
- Maintain a repair business profile
- Provide service categories
- Set location
- Manage availability
- Receive repair requests
- Accept repair requests
- Diagnose products
- Provide repair estimates
- Update repair progress
- Complete repair requests
- View repair jobs
- Manage their profile
- View repair-related notifications

Repair Partners are subject to an administrative verification workflow before being presented as verified providers in the public Repair Network.

---

## 🛡️ Admin Features

Administrators can:

- View platform dashboard
- Manage users
- Manage repair providers
- Verify repair partners
- Reject provider applications
- Manage products
- Manage repair requests
- Review marketplace listings
- Approve marketplace listings
- Remove marketplace listings
- Manage donations
- Manage recycling requests
- View platform analytics
- Manage reviews
- Manage complaints
- Manage platform settings
- View administrative notifications

---

# 🛒 Marketplace

The ReLoop Marketplace allows customers to list registered products for resale.

A marketplace listing contains information such as:

- Product title
- Product name
- Brand
- Model
- Category
- Condition
- Product health
- Price
- Location
- Product image
- Seller information
- Listing status
- Verification status

## Marketplace Approval Flow

```text
Customer
    │
    ▼
Select Registered Product
    │
    ▼
Create Marketplace Listing
    │
    ▼
Listing Status:
"Pending Review"
    │
    ▼
Admin Reviews Listing
    │
    ├── Reject / Remove
    │
    └── Approve
          │
          ▼
       "Active"
          │
          ▼
Public Marketplace

```

## 📄 License

This project was developed as an academic and internship final project.

Copyright © 2026 Muhammad Huzaifa Khan.

All rights reserved.