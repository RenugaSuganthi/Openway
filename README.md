<img src="https://capsule-render.vercel.app/api?type=wave&amp;color=0:1a1a2e,100:16213e&amp;height=200&amp;section=header&amp;text=Openway&amp;fontSize=50&amp;fontColor=fff&amp;animation=twinkling&amp;fontAlignY=40&amp;desc=Smart+Public+Transport+and+Social+Assistance+System&amp;descAlignY=60&amp;descSize=18&amp;descColor=70a5fd" width="100%"/>

<div align="center">

![React](https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6C37?style=flat-square&logo=postman&logoColor=white)
![MVC](https://img.shields.io/badge/MVC_Architecture-6DB33F?style=flat-square&logo=spring&logoColor=white)

**Jan 2026 – Mar 2026**

</div>

---

## 📌 Overview

**Openway** is a full-stack web application that digitalises **public transport route management** and **social service request delivery** for citizens. Built with a React.js frontend and Spring Boot backend, it provides real-time route tracking and a seamless interface for submitting and managing social assistance requests.

> 🎯 Problem Solved: Citizens had no unified digital platform to check transport routes or request government social services — Openway bridges that gap.

---

## ✨ Features

- 🗺️ **Real-time Route Tracking** — Live bus/transport route display with stops and timing
- 📋 **Social Service Request Portal** — Citizens can submit, track, and manage assistance requests
- 🔐 **Role-based Access** — Separate views for admin (route management) and citizens (requests/tracking)
- 📱 **Fully Responsive UI** — Works seamlessly across mobile, tablet, and desktop
- ⚡ **RESTful API Backend** — 10+ well-structured endpoints with clear separation of concerns
- 🗄️ **Normalised Database Schema** — Relational MySQL design for routes, services, and requests

---

## 🏗️ Architecture

```
Openway/
├── app/                           # React.js Frontend Application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Route/page-level components
│   │   ├── services/              # API call functions (axios)
│   │   └── App.jsx                # Root component + routing
│   ├── tailwind.config.js
│   └── package.json
│
├── openway backend/               # Spring Boot Backend Application
│   └── src/main/java/
│       ├── controller/            # REST Controllers (10+ endpoints)
│       ├── service/               # Business logic layer
│       ├── repository/            # JPA Repositories (MySQL)
│       ├── model/                 # Entity classes
│       └── OpenWayApplication.java
│
└── database/
    └── schema.sql                 # Normalised MySQL schema
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, JavaScript (ES6+) |
| Backend | Spring Boot, Java, Spring MVC |
| Database | MySQL (normalised relational schema) |
| API Style | RESTful (10+ endpoints) |
| Architecture | MVC (Model–View–Controller) |
| Version Control | Git & GitHub |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/routes` | Fetch all transport routes |
| GET | `/api/routes/{id}` | Get route by ID with stops |
| POST | `/api/routes` | Add a new route (admin) |
| PUT | `/api/routes/{id}` | Update route details |
| DELETE | `/api/routes/{id}` | Remove a route |
| GET | `/api/services` | List available social services |
| POST | `/api/requests` | Submit a service request |
| GET | `/api/requests/{userId}` | Get citizen's request history |
| PUT | `/api/requests/{id}/status` | Update request status (admin) |
| GET | `/api/dashboard/stats` | Admin dashboard summary |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Java 17+
- MySQL 8+
- Maven

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/RenugaSuganthi/Openway.git
cd "Openway/openway backend"

# Configure MySQL in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/openway_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Run the application
mvn spring-boot:run
```

### Frontend Setup
```bash
cd Openway/app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup
```bash
# Import the schema
mysql -u root -p < database/schema.sql
```

The app will be running at `http://localhost:5173` (frontend) and `http://localhost:8080` (backend).

---

## 📸 Screenshots

> _Add screenshots of your app here by dragging images into the GitHub editor_

| Home / Route View | Social Service Portal | Admin Dashboard |
|---|---|---|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## 🧠 Key Learnings

- Designed and implemented a **normalised relational MySQL schema** with foreign key constraints
- Built **10+ RESTful APIs** following Spring MVC best practices
- Integrated **React Router** for client-side navigation with protected routes
- Applied **Tailwind CSS** responsive design utilities for cross-device compatibility
- Practised **full SDLC** from requirements → design → implementation → testing

---

## 👩‍💻 Author

**Renuga K** — Full Stack Developer  
📧 lakshitharenuga@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/renuga-k-a847b828b) · [GitHub](https://github.com/RenugaSuganthi)

<img src="https://capsule-render.vercel.app/api?type=wave&amp;color=0:1a1a2e,100:16213e&amp;height=100&amp;section=footer&amp;animation=fadeIn" width="100%"/>
