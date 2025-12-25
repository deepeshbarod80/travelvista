# Travelvista Local Development Setup

## Prerequisites

### 1. Install Node.js
```bash
# Install Node.js (v18 or higher)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MongoDB
```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
```

### 3. Install Redis
```bash
# Install Redis
sudo apt update
sudo apt install redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify installation
redis-cli ping
```

## Project Setup

### 1. Clone and Install Dependencies
```bash
# head to code directory
cd ./travelvista
npm run installer
```

```bash
cd /path/to/your/projects
git clone <repository-url>
cd travelvista

# Install all dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 2. Environment Configuration
```bash
# Create environment files
cp frontend/.env.sample frontend/.env
cp backend/.env.sample backend/.env

# Edit backend/.env if needed (default values should work)
# MongoDB: mongodb://127.0.0.1/travelvista
# Redis: redis://127.0.0.1:6379
```

### 3. Start Services
```bash
# Check if MongoDB and Redis are running
sudo systemctl status mongod
sudo systemctl status redis-server

# If not running, start them
sudo systemctl start mongod
sudo systemctl start redis-server
```

### 4. Launch Application
```bash
cd /path/to/travelvista
npm start
```

## Access URLs

- **Frontend**: http://localhost:8002 (or check console for actual port)
- **Backend**: http://localhost:8003
- **API Base**: http://localhost:8003/api   (Only will work with public ip)

## Troubleshooting

### Port Issues
- If port 5173 is busy, Vite will use next available port (5174, 5175, etc.)
- Check console output for actual frontend URL

### Database Connection
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check Redis status
sudo systemctl status redis-server

# Restart if needed
sudo systemctl restart mongod
sudo systemctl restart redis-server
```

### Authentication Errors
- Backend auth errors are normal for unauthenticated users
- Sign up/login to access protected features

### Clean Restart
```bash
# Stop application (Ctrl+C)
# Clear node modules and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm run installer
npm start
```

## Features Available

1. **Public Access**:
   - View all blog posts
   - Read individual posts
   - Browse by categories

2. **Authenticated Users**:
   - Create new blog posts
   - Edit own posts
   - User dashboard

3. **Admin Users**:
   - Manage all posts
   - User management
   - Admin dashboard

## Development Commands

```bash
# Start frontend only
npm run start-frontend

# Start backend only  
npm run start-backend

# Run tests
cd frontend && npm test
cd backend && npm test

# Build for production
cd frontend && npm run build
cd backend && npm run build
```
