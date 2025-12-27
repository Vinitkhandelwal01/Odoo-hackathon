# 🗄️ MongoDB Setup Guide (Hindi/English)

## ⚠️ Problem: MongoDB Team Ke Liye Kaise Setup Karein?

Agar aap local MongoDB use kar rahe ho, to wo sirf aapke machine pe chalega. Team ke liye **MongoDB Atlas** use karna padega.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: MongoDB Atlas Account Banao (FREE)

1. [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) pe jao
2. **"Try Free"** ya **"Sign Up"** click karo
3. Free account banao (credit card ki zarurat nahi)

### Step 2: Cluster Banao

1. **"Build a Database"** click karo
2. **FREE (M0) Shared** select karo
3. Region select karo (India ke liye Mumbai ya Singapore)
4. **"Create"** click karo (3-5 minutes lagenge)

### Step 3: Database User Banao

1. Left sidebar se **"Database Access"** pe jao
2. **"Add New Database User"** click karo
3. **"Password"** select karo
4. Username aur password daalo (ye save kar lo!)
5. **"Atlas Admin"** ya **"Read and write"** select karo
6. **"Add User"** click karo

### Step 4: Connection String Lo

1. **"Clusters"** → Apne cluster pe **"Connect"** click karo
2. **"Connect your application"** select karo
3. **"Node.js"** aur version **"5.5 or later"** select karo
4. Connection string copy karo:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Connection String Update Karo

1. `<password>` ko apne database user ka password se replace karo
2. End pe database name add karo: `/gear-guard`
3. Final format:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gear-guard?retryWrites=true&w=majority
   ```

### Step 6: Network Access Setup Karo

1. **"Network Access"** (left sidebar) pe jao
2. **"Add IP Address"** click karo
3. Development ke liye **"Allow Access from Anywhere"** (0.0.0.0/0) select karo
4. **"Confirm"** click karo

⚠️ **Note**: Production ke liye specific IPs allow karo (security ke liye)

### Step 7: .env.local File Update Karo

Project root mein `.env.local` file banao ya update karo:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/gear-guard?retryWrites=true&w=majority
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- `.env.local` ko git mein commit mat karo (already `.gitignore` mein hai)
- Har team member ko apna `.env.local` file chahiye
- Connection string ko securely share karo (public repos mein mat daalo!)

---

## ✅ Connection Test Karo

Server start karne ke baad, browser mein jao:
```
http://localhost:3000/api/health
```

Agar sab theek hai to ye dikhega:
```json
{
  "status": "success",
  "message": "MongoDB is connected and working!",
  "connectionState": "connected"
}
```

Agar error hai to detailed instructions dikhenge.

---

## 📋 Team Ke Liye Steps

### Har Team Member Ko Ye Karna Hoga:

1. **Repository clone karo**
   ```bash
   git clone <your-repo-url>
   cd odoo
   ```

2. **Dependencies install karo**
   ```bash
   npm install
   ```

3. **.env.local file banao**
   - Project root mein `.env.local` file banao
   - MongoDB Atlas connection string daalo
   - Same connection string sab team members use kar sakte hain

4. **App start karo**
   ```bash
   npm run dev
   ```

5. **Health check karo**
   - Browser mein: `http://localhost:3000/api/health`
   - Agar "success" dikhe to sab theek hai!

6. **Sample data initialize karo** (pehli baar)
   - Dashboard pe jao
   - "🚀 Initialize Sample Data" button click karo
   - Ya API call: `POST http://localhost:3000/api/setup`

---

## 🔧 Troubleshooting

### Error: "MONGODB_URI not found"
**Solution**: `.env.local` file banao aur `MONGODB_URI` add karo

### Error: "Authentication failed"
**Solution**: 
- Username/password check karo
- Password mein special characters ho to URL encode karo
- Database user ka permission check karo

### Error: "Connection timeout"
**Solution**:
- Internet connection check karo
- Cluster paused to nahi hai check karo
- Network Access mein IP whitelist karo
- Firewall settings check karo

### Error: "getaddrinfo ENOTFOUND"
**Solution**: Connection string sahi hai ya nahi check karo

---

## 📝 Example .env.local

```env
# MongoDB Atlas (Team Shared)
MONGODB_URI=mongodb+srv://teamuser:SecurePass123@cluster0.abc123.mongodb.net/gear-guard?retryWrites=true&w=majority

# Local Development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🆚 Local vs Atlas

| Feature | Local MongoDB | MongoDB Atlas |
|---------|--------------|---------------|
| **Team ke liye?** | ❌ Nahi (sirf aapke machine pe) | ✅ Haan (sab use kar sakte hain) |
| **Setup time** | 5 minutes | 10 minutes |
| **Cost** | Free | Free (M0 tier) |
| **Internet** | ❌ Nahi chahiye | ✅ Chahiye |
| **Best for** | Solo development | Team collaboration |

---

## ✅ Checklist

- [ ] MongoDB Atlas account bana liya
- [ ] Cluster create kar liya aur running hai
- [ ] Database user bana liya
- [ ] Network access setup kar liya (IP whitelist)
- [ ] Connection string mil gaya
- [ ] `.env.local` file mein connection string daal diya
- [ ] Health check pass ho gaya (`/api/health`)
- [ ] App start ho raha hai bina errors
- [ ] Sample data initialize kar liya
- [ ] Team members ko connection string share kar diya

---

## 🆘 Help Chahiye?

1. Health check endpoint: `http://localhost:3000/api/health`
2. MongoDB Atlas docs: [https://docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
3. Console mein errors check karo (browser DevTools)

**Sab theek ho jayega! 🚀**

