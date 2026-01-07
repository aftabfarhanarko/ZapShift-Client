# Pando Go - Parcel Delivery Dashboard

A modern, responsive parcel delivery management system built with React 19 and Tailwind CSS. Features role-based dashboards for **Users**, **Riders**, and **Admins**.

Live Demo: [https://zapshift.vercel.app](https://zapshift.vercel.app) *(replace with your actual link)*

## 🚀 Features

- **Role-based Dashboard**
  - User: Book parcels, track deliveries, view payment history
  - Rider: View assigned deliveries, mark as completed
  - Admin: Manage users, riders, assign deliveries, view reports
- Dark/Light theme toggle with persistence
- Fully responsive design (mobile-first with drawer sidebar)
- Real-time notifications & coverage map
- Secure authentication with Firebase
- Smooth animations using Framer Motion, AOS & Lottie
- Payment integration with Stripe
- PDF report generation using jsPDF + AutoTable
- Interactive charts with Recharts
- Fast marquee, carousels, and spinners for better UX

## 🛠️ Tech Stack

| Category              | Technology                                      |
|-----------------------|-------------------------------------------------|
| Framework             | React 19 + Vite                                 |
| Routing               | React Router v7                                 |
| Styling               | Tailwind CSS v4 + DaisyUI (themes)              |
| State Management      | TanStack Query (React Query)                    |
| Authentication        | Firebase Auth                                   |
| UI Components         | Lucide React Icons, React Icons                 |
| Animations            | Framer Motion, AOS, Lottie React, DotLottie     |
| Maps                  | React Leaflet                                   |
| Payments              | Stripe (@stripe/react-stripe-js)                 |
| Notifications         | Sonner (toast)                                  |
| Alerts                | SweetAlert2                                     |
| Carousel              | React Responsive Carousel + Swiper              |
| Charts                | Recharts                                        |
| PDF Export            | jsPDF + jsPDF-AutoTable                         |
| Loading Spinners      | React Spinners                                  |
| Marquee               | React Fast Marquee                              |

## 📦 Installation & Setup

### Prerequisites
- Node.js ≥ 18
- npm or yarn or pnpm

### Steps



src/
├── components/     # Reusable UI components
├── pages/          # Route pages (Home, Dashboard, etc.)
├── Hook/           # Custom hooks (useAuth, useRole, etc.)
├── lib/            # Utilities & Firebase config
├── assets/         # Images, Lottie files, logos
├── routes/         # Protected & role-based routes
└── App.jsx         # Main app with router