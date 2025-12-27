# 👥 Team Setup Guide

## For Team Collaboration - You NEED MongoDB Atlas

The current setup uses **local MongoDB** which only works on your machine. For your team to collaborate, you need **MongoDB Atlas** (free cloud database).

---

## 🚀 Quick Setup for Teams

### Step 1: Create MongoDB Atlas Account (Free)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Create a free account (no credit card needed for M0 tier)

### Step 2: Create a Cluster

1. After signing up, click **"Build a Database"**
2. Choose **FREE (M0) Shared** cluster
3. Select a cloud provider and region (choose closest to your team)
4. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set privileges to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Get Connection String

1. Go to **Clusters** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"5.5 or later"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update Connection String

1. Replace `<password>` with your database user password
2. Add database name at the end: `/gear-guard`
3. Final format:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gear-guard?retryWrites=true&w=majority
   ```

### Step 6: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

⚠️ **Note**: For production, restrict to specific IPs for security.

### Step 7: Update .env.local

Create or update `.env.local` file in project root:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/gear-guard?retryWrites=true&w=majority
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- Never commit `.env.local` to git (it's in `.gitignore`)
- Each team member needs to create their own `.env.local` with the same Atlas connection string
- Share the connection string securely (not in public repos!)

---

## 📋 Team Workflow

### For Each Team Member:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd odoo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file**
   ```bash
   # Copy from .env.example or create new
   # Add the MongoDB Atlas connection string
   ```

4. **Start the app**
   ```bash
   npm run dev
   ```

5. **Initialize data (first time only)**
   - Go to Dashboard
   - Click "🚀 Initialize Sample Data"
   - OR call: `POST http://localhost:3000/api/setup`

---

## 🔒 Security Best Practices

### Option A: Shared Atlas Cluster (Recommended for Small Teams)
- Everyone uses the same connection string
- All data is shared
- Easy setup

### Option B: Individual Atlas Clusters (For Larger Teams)
- Each developer has their own free Atlas cluster
- Separate databases
- More setup but better isolation

### Option C: Environment-Specific
- Development: Shared Atlas cluster
- Production: Separate production cluster
- Use different `.env.local` for each environment

---

## 🆚 Local vs Atlas Comparison

| Feature | Local MongoDB | MongoDB Atlas |
|---------|--------------|---------------|
| **Works for team?** | ❌ No (only your machine) | ✅ Yes (everyone can access) |
| **Setup time** | 5 minutes | 10 minutes |
| **Cost** | Free | Free (M0 tier) |
| **Internet required** | ❌ No | ✅ Yes |
| **Data persistence** | Local only | Cloud (backed up) |
| **Best for** | Solo development | Team collaboration |

---

## 🐛 Troubleshooting

### Connection Error?
- Check your connection string format
- Verify username/password are correct
- Ensure IP is whitelisted in Network Access
- Check cluster is running (not paused)

### "Authentication failed"?
- Verify database user credentials
- Make sure password doesn't have special characters (or URL encode them)
- Check user has proper permissions

### "Timeout" or "Connection refused"?
- Check internet connection
- Verify cluster is not paused
- Check firewall settings
- Try whitelisting your IP again

---

## 📝 Example .env.local

```env
# MongoDB Atlas Connection (Team Shared)
MONGODB_URI=mongodb+srv://teamuser:SecurePass123@cluster0.abc123.mongodb.net/gear-guard?retryWrites=true&w=majority

# Local Development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ Checklist for Team Setup

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created
- [ ] Network access configured (IP whitelisted)
- [ ] Connection string obtained
- [ ] `.env.local` created with connection string
- [ ] App starts without errors
- [ ] Sample data initialized
- [ ] Team members can access shared database

---

**Need Help?** Check MongoDB Atlas documentation: [https://docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

