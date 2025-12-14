# Quick Start Guide

Get up and running with the Sweet Shop Management System in minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node -v`)
- ✅ PostgreSQL 14+ installed and running
- ✅ npm or yarn installed
- ✅ Git installed

## 5-Minute Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/TouchstoneTheDev/incubyte-v1.git
cd incubyte-v1

# Run automated setup
./setup.sh
```

The setup script will:
- Install all dependencies
- Create environment files
- Guide you through database setup

### 2. Database Setup (1 minute)

```bash
# Option A: Let the script create it
# (Answer 'y' when prompted during setup.sh)

# Option B: Create manually
psql -U postgres -c "CREATE DATABASE sweet_shop;"
```

### 3. Configure Environment (30 seconds)

Edit `backend/.env` if needed:
```env
DB_USERNAME=postgres      # Your PostgreSQL username
DB_PASSWORD=postgres      # Your PostgreSQL password
```

### 4. Start the Application (1 minute)

```bash
# Start both frontend and backend
npm run dev
```

That's it! 🎉

### 5. Access the Application (30 seconds)

Open your browser:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## First Steps

### Create Your First Account

1. Go to http://localhost:5173
2. Click "Register here"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
4. Click "Register"

### Make Yourself an Admin

To test admin features:

```bash
# Connect to PostgreSQL
psql -U postgres -d sweet_shop

# Update your user to admin
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';

# Exit
\q
```

Refresh the page - you'll now see admin features! 👑

### Add Your First Sweet

As an admin:
1. Click "+ Add New Sweet"
2. Fill in the details:
   - Name: Chocolate Truffle
   - Category: Chocolate
   - Price: 5.99
   - Quantity: 100
3. Click "Add Sweet"

### Test the Features

**As a User:**
- Browse sweets
- Search by name
- Filter by category
- Filter by price range
- Purchase sweets

**As an Admin:**
- All user features, plus:
- Add new sweets
- Edit sweet details
- Delete sweets
- Restock inventory

## Alternative: Docker Setup

If you prefer Docker:

```bash
# Start everything with Docker
docker-compose up
```

This will:
- Start PostgreSQL in a container
- Build and run the backend
- Build and run the frontend

Access at same URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Running Tests

```bash
# All tests
npm test

# Backend only
cd backend && npm test

# Frontend only
cd frontend && npm test

# Watch mode (recommended during development)
cd backend && npm run test:watch
```

## Troubleshooting

### Port Already in Use

If ports 3001 or 5173 are in use:

**Backend (3001):**
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9

# Or change port in backend/.env
PORT=3002
```

**Frontend (5173):**
```bash
# Kill process
lsof -ti:5173 | xargs kill -9

# Or Vite will auto-assign a new port
```

### Database Connection Error

```bash
# Ensure PostgreSQL is running
sudo service postgresql start    # Linux
brew services start postgresql   # macOS

# Verify connection
psql -U postgres -c "SELECT 1;"
```

### TypeScript Errors

```bash
# Rebuild
cd backend && npm run build
cd ../frontend && npm run build
```

### Dependencies Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

# Reinstall
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

## Next Steps

- 📖 Read the full [README.md](README.md)
- 🧪 Explore the [test files](backend/src/tests)
- 🎨 Customize the [frontend styles](frontend/src/index.css)
- 🔧 Review the [API documentation](README.md#api-documentation)
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Common Tasks

### Creating a Backup

```bash
# Backup database
pg_dump -U postgres sweet_shop > backup.sql

# Restore
psql -U postgres sweet_shop < backup.sql
```

### Resetting Database

```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE IF EXISTS sweet_shop;"
psql -U postgres -c "CREATE DATABASE sweet_shop;"

# Restart backend to sync schema
cd backend && npm run dev
```

### Viewing Logs

```bash
# Backend logs (in terminal)
cd backend && npm run dev

# Frontend logs (browser console)
F12 > Console tab
```

## Getting Help

- 📝 Check the [README](README.md)
- 🐛 Open an [issue](https://github.com/TouchstoneTheDev/incubyte-v1/issues)
- 💬 Review [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Need more details?** Check the comprehensive [README.md](README.md) for in-depth documentation.

**Ready to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Happy coding! 🍬
