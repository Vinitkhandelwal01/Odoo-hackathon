# 🛡️ Gear Guard - Equipment Maintenance Management System

A comprehensive Next.js 14 application for managing equipment maintenance requests, teams, and schedules.

## 🧱 Tech Stack

- **Next.js 14** (App Router)
- **MongoDB + Mongoose**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**
- **FullCalendar**
- **react-beautiful-dnd** (Kanban Board)

## 📁 Project Structure

```
gear-guard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Dashboard)
│   ├── equipment/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── teams/
│   │   └── page.tsx
│   ├── requests/
│   │   ├── page.tsx (Kanban)
│   │   ├── calendar/page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   └── api/
│       ├── equipment/
│       ├── teams/
│       ├── requests/
│       └── users/
├── models/
│   ├── Equipment.ts
│   ├── Team.ts
│   ├── User.ts
│   └── MaintenanceRequest.ts
├── lib/
│   └── mongodb.ts
└── components/
    ├── KanbanBoard.tsx
    ├── RequestCard.tsx
    ├── EquipmentForm.tsx
    └── CalendarView.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   
   **For Local Development (Solo):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/gear-guard
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   
   **For Team Collaboration (Recommended):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gear-guard?retryWrites=true&w=majority
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   
   📖 **See [TEAM_SETUP.md](./TEAM_SETUP.md) for detailed MongoDB Atlas setup instructions**

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Test MongoDB connection:**
   Open [http://localhost:3000/api/health](http://localhost:3000/api/health) in browser
   - Should show: `{"status":"success","message":"MongoDB is connected and working!"}`
   - If error, check `.env.local` file and MongoDB connection

5. **Set up initial data (optional):**
   You can create sample teams and users by making a POST request to `/api/setup`:
   ```bash
   curl -X POST http://localhost:3000/api/setup
   ```
   Or use Postman/Thunder Client to call this endpoint.
   Or go to Dashboard and click "🚀 Initialize Sample Data"

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Features

### 🏭 Equipment Management
- Create, view, and manage equipment
- Track serial numbers, departments, and locations
- Assign maintenance teams and default technicians
- View maintenance request counts per equipment

### 👥 Team Management
- Create and manage maintenance teams
- Assign teams to equipment

### 📋 Maintenance Requests
- **Kanban Board**: Drag and drop requests between statuses (New, In Progress, Repaired, Scrap)
- **Auto-fill**: When creating a request, team and technician are automatically filled based on equipment
- **Calendar View**: View preventive maintenance requests on a calendar
- **Status Management**: Update request statuses with automatic equipment scrapping when status is "Scrap"

### 📊 Dashboard
- Overview statistics
- Quick actions
- System overview

## 🔌 API Endpoints

### Equipment
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment?id=XXX` - Get specific equipment
- `POST /api/equipment` - Create equipment
- `PATCH /api/equipment/[id]` - Update equipment
- `DELETE /api/equipment/[id]` - Delete equipment

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests?equipmentId=XXX` - Get requests for equipment
- `GET /api/requests?type=Preventive` - Get preventive requests
- `POST /api/requests` - Create request (auto-fills team & technician)
- `PATCH /api/requests/[id]` - Update request status
- `DELETE /api/requests/[id]` - Delete request

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

## 🎯 Key Features Explained

### Auto-fill Magic
When creating a maintenance request:
1. Select equipment
2. Team and Technician are automatically filled from equipment settings
3. No manual selection needed!

### Kanban Board
- Drag requests between columns
- Status automatically updates via API
- Real-time visual feedback

### Scrap Logic
When a request status is changed to "Scrap":
- The associated equipment is automatically marked as `isScrapped: true`
- Equipment won't appear in regular equipment lists

### Smart Maintenance Button
On equipment pages, a "Maintenance (count)" button shows:
- Total number of requests for that equipment
- Click to view all related requests

## 🛠️ Build & Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## 📝 Notes

- Make sure MongoDB is running before starting the app
- The app uses MongoDB connection pooling for optimal performance
- All dates are stored in ISO format
- Equipment marked as scrapped won't appear in equipment selection dropdowns

## 👥 Team Collaboration

**For team collaboration, you MUST use MongoDB Atlas** (not local MongoDB).

- Local MongoDB only works on your machine
- MongoDB Atlas is free and works for entire team
- See **[TEAM_SETUP.md](./TEAM_SETUP.md)** for complete setup guide

Quick steps:
1. Create free MongoDB Atlas account
2. Create cluster and database user
3. Get connection string
4. Update `.env.local` with Atlas connection string
5. Share connection string with team (securely!)

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📄 License

MIT License

