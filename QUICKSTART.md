# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up MongoDB
Make sure MongoDB is running. Update `.env.local` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/gear-guard
```

## Step 3: Initialize Sample Data
After starting the server, call the setup endpoint:
```bash
# Using curl
curl -X POST http://localhost:3000/api/setup

# Or use Postman/Thunder Client
POST http://localhost:3000/api/setup
```

This will create:
- 3 sample teams (Electrical, Mechanical, IT Support)
- 3 sample users (John Doe, Jane Smith, Bob Johnson)

## Step 4: Start Development Server
```bash
npm run dev
```

## Step 5: Start Using the App!

1. **Create Equipment**: Go to `/equipment/new` and add your first equipment
2. **Assign Team & Technician**: When creating equipment, assign a maintenance team and default technician
3. **Create Requests**: Go to `/requests/new` - team and technician will auto-fill based on equipment!
4. **Manage Requests**: Use the Kanban board at `/requests` to drag and drop requests
5. **View Calendar**: Check `/requests/calendar` for preventive maintenance schedule

## 🎯 Key Workflow

1. Create Teams → Create Users → Create Equipment (with team & technician)
2. Create Maintenance Request → Select Equipment → Team & Technician auto-fill!
3. Drag requests in Kanban board to update status
4. When status = "Scrap", equipment is automatically marked as scrapped

Enjoy! 🎉

