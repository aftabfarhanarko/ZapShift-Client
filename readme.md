# 🐼 Panda Go

## Role Based Delivery Platform (User • Rider • Admin)

**Panda Go** is a **full premium, role-based delivery platform** built using **React 19**, **Tailwind CSS v4**, and a modern frontend ecosystem.  
The application is designed with **three distinct roles** — **User**, **Rider**, and **Admin** — each having separate permissions, dashboards, and workflows.

This project focuses on **clean architecture**, **modern UI/UX**, **smooth animations**, and **scalable role-based access control (RBAC)**.

---

## 🚀 Live Demo : https://pandago.up.railway.app

## ✨ Key Features

### 👤 User Features

- Secure authentication & authorization
- Place delivery orders
- Online payment using Stripe
- Order tracking with real-time status
- Interactive map integration
- Download invoices as PDF
- Modern, animated UI

### 🚴 Rider Features

- Rider authentication
- View assigned orders
- Update delivery status
- Location-based delivery support
- Lightweight & performance-optimized interface

### 🛠️ Admin Features

- Admin dashboard
- Manage users, riders, and orders
- Role-based access control (RBAC)
- Analytics & charts
- Secure system management

---

## 🧠 Tech Stack

### 🔹 Core Frontend

- React 19
- React DOM
- React Router v7
- Tailwind CSS v4

### 🔹 State & Data Management

- TanStack React Query
- Axios

### 🔹 Authentication & Services

- Firebase
- Dotenv

### 🔹 UI / UX & Animation

- Framer Motion
- Motion
- AOS (Animate on Scroll)
- Swiper
- React Fast Marquee
- React Responsive Carousel
- Lottie & DotLottie

### 🔹 Forms & Notifications

- React Hook Form
- SweetAlert2
- Sonner (Toast Notifications)

### 🔹 Maps & Analytics

- React Leaflet
- Recharts

---

## 💳 Stripe Payment System

Panda Go integrates a **secure and production-ready Stripe payment system** to handle online transactions smoothly and safely.

### 🔐 Payment Features

- Secure card payment using **Stripe**
- Stripe Elements for modern UI
- Real-time payment confirmation
- Payment intent based flow
- Error handling & payment status feedback
- Seamless user experience

### 💰 Payment Flow

1. User places a delivery order
2. Redirected to Stripe payment gateway
3. Secure card payment processing
4. Payment success confirmation
5. Order status automatically updated

### 🛡️ Security

- PCI-DSS compliant payment processing
- No card data stored on the client
- Stripe handles all sensitive information

---

## 📍 Live Track Parcel (Real-Time Tracking)

Panda Go provides a **Live Parcel Tracking System** that allows users to track their delivery in real time.

### 🚚 Tracking Features

- Real-time parcel location tracking
- Rider location updates
- Interactive map using **React Leaflet**
- Live status updates  
  _(Pending → Picked → On the Way → Delivered)_
- Smooth map animations

### 🗺️ Tracking Flow

1. Order is assigned to a rider
2. Rider location updates continuously
3. User views parcel location on the map
4. Delivery status updates in real time

### 📡 Technology Used

- React Leaflet
- Real-time data updates
- Optimized performance for mobile devices

---

## 🔄 Order Status Lifecycle

| Status     | Description                   |
| ---------- | ----------------------------- |
| Pending    | Order placed successfully     |
| Accepted   | Rider accepted the order      |
| Picked Up  | Parcel picked from source     |
| On the Way | Parcel in transit             |
| Delivered  | Parcel delivered successfully |

---

## 🌟 User Experience Highlights

- Smooth real-time animations
- Instant feedback on payment & tracking
- Mobile-first responsive design
- Premium UI consistency

---

## 🎨 Icons & Loaders

- Lucide React
- React Icons
- React Spinners

---

## 🧾 PDF & Reports

- jsPDF
- jsPDF AutoTable

---

## 📦 Dependencies

```json
{
  "@lottiefiles/dotlottie-react": "^0.17.8",
  "@stripe/react-stripe-js": "^5.4.0",
  "@stripe/stripe-js": "^8.5.2",
  "@tailwindcss/vite": "^4.1.17",
  "@tanstack/react-query": "^5.90.10",
  "aos": "^2.3.4",
  "axios": "^1.13.2",
  "dotenv": "^17.2.3",
  "firebase": "^12.6.0",
  "framer-motion": "^12.24.10",
  "jspdf": "^4.0.0",
  "jspdf-autotable": "^5.0.7",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.554.0",
  "motion": "^12.23.24",
  "react": "^19.2.0",
  "react-countup": "^6.5.3",
  "react-dom": "^19.2.0",
  "react-fast-marquee": "^1.6.5",
  "react-hook-form": "^7.66.0",
  "react-icons": "^5.5.0",
  "react-leaflet": "^5.0.0-rc.2",
  "react-responsive-carousel": "^3.2.23",
  "react-router": "^7.9.6",
  "react-spinners": "^0.17.0",
  "recharts": "^3.5.1",
  "sonner": "^2.0.7",
  "sweetalert2": "^11.26.3",
  "swiper": "^12.0.3",
  "tailwindcss": "^4.1.17"
}
📱 Responsive Design

Fully responsive (Mobile / Tablet / Desktop)

Optimized animations for mobile devices

Premium UI consistency across all screen sizes

⚡ Performance Optimization

React Query caching

Lazy loading components

Optimized animations

Clean folder structure

📂 Project Type

Role-Based Delivery Application

Full Stack Ready Frontend

Portfolio / Production Level Project

🧑‍💻 Developer

Project Name: Panda Go
Built With: Modern React Ecosystem
Level: Full Premium

📜 License

This project is open for learning, portfolio, and demonstration purposes.
You may customize and extend it freely.
```
