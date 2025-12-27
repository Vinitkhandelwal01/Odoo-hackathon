# 🛡️ Gear Guard

### Equipment Maintenance Management System

Gear Guard is a full-stack equipment maintenance management system designed to streamline how organizations manage equipment, maintenance teams, and service requests. It provides a structured workflow for corrective and preventive maintenance using modern web technologies.

---

## 🧱 Tech Stack

### Frontend

* **Next.js 14** (App Router)
* **Tailwind CSS**
* **Framer Motion**
* **Axios**
* **FullCalendar**
* **react-beautiful-dnd** (Kanban Board)

### Backend

* **FastAPI**
* **MongoDB Atlas**
* **PyMongo (Async API)**
* **Pydantic**

---

## 📁 Project Structure

### Frontend (Next.js)

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Dashboard
│   ├── equipment/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── teams/
│   │   └── page.tsx
│   ├── requests/
│   │   ├── page.tsx            # Kanban Board
│   │   ├── calendar/page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   └── api/
├── components/
│   ├── KanbanBoard.tsx
│   ├── RequestCard.tsx
│   ├── EquipmentForm.tsx
│   └── CalendarView.tsx
└── lib/
    └── api.ts
```

### Backend (FastAPI)

```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   ├── user.py
│   │   ├── team.py
│   │   ├── equipment.py
│   │   └── maintenance_request.py
│   ├── routers/
│   │   ├── users.py
│   │   ├── teams.py
│   │   ├── equipment.py
│   │   └── requests.py
│   └── utils/
│       └── responses.py
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Python 3.10+
* MongoDB Atlas account

---

## 🔧 Environment Setup

### Backend (`.env`)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gear_guard
DB_NAME=gear_guard
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ▶️ Running the Application

### Backend

```bash
cd backend
pip install fastapi uvicorn pymongo python-dotenv
uvicorn app.main:app --reload
```


---

### Frontend

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## ✨ Features

### 🏭 Equipment Management

* Create, update, and delete equipment
* Track serial number, department, and location
* Assign default maintenance team and technician
* Automatically exclude scrapped equipment from selection

---

### 👥 Team Management

* Create maintenance teams
* Assign technicians to teams
* Link teams to equipment

---

### 👤 User Management

* Create users with defined roles
* Fetch and assign technicians to teams and equipment

---

### 📋 Maintenance Requests

* Create corrective and preventive maintenance requests
* Auto-fill assigned team and technician based on equipment
* Track request lifecycle:

  * **New**
  * **In Progress**
  * **Repaired**
  * **Scrap**

---

### 🧲 Kanban Board

* Drag-and-drop maintenance requests between statuses
* Real-time status updates via API
* Clear visual workflow for maintenance operations

---

### 📅 Calendar View

* Visualize preventive maintenance schedules
* Monthly, weekly, and daily views
* Quick access to scheduled maintenance tasks

---

### ♻️ Scrap Logic

* When a request is marked as **Scrap**:

  * The associated equipment is automatically marked as scrapped
  * Scrapped equipment is removed from active workflows

---

### 📊 Dashboard

* Equipment count overview
* Maintenance request statistics
* Quick navigation to core features

---

## 🔌 API Overview

### Equipment

* `GET /equipment`
* `POST /equipment`
* `PATCH /equipment/{id}`
* `DELETE /equipment/{id}`

### Teams

* `GET /teams`
* `POST /teams`

### Users

* `GET /users`
* `POST /users`

### Maintenance Requests

* `GET /requests`
* `GET /requests?equipmentId=`
* `GET /requests?type=Preventive`
* `POST /requests`
* `PATCH /requests/{id}`
* `DELETE /requests/{id}`

---

## 🧠 Key Design Decisions

* **FastAPI** for high-performance async APIs
* **MongoDB Atlas** for scalable team collaboration
* **Auto-derived relationships** to minimize frontend complexity
* **Status-driven workflow** aligned with real-world maintenance processes

---

## 👥 Team Collaboration

* MongoDB Atlas enables real-time multi-user access
* Shared API-based architecture allows parallel frontend/backend development
* Secure environment variable handling

---

## 🛠️ Build & Deploy

### Frontend

```bash
npm run dev
```

### Backend

```bash
   cd backend
   uvicorn app.main:app --reload
```

---

## 📄 License

MIT License
