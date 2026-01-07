# Quick Start Guide

## Prerequisites

Before you begin, make sure you have installed:
- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **Node.js 18+** - [Download here](https://nodejs.org/)

## Option 1: Automatic Startup (Easiest)

### On Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

### On Windows:
```bash
start.bat
```

Then open your browser to **http://localhost:3000**

---

## Option 2: Manual Startup

### Step 1: Start the Backend

Open a terminal in the `todo-app` folder:

```bash
cd backend

# Create virtual environment (first time only)
python3 -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Run the server
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

**Keep this terminal open!**

### Step 2: Start the Frontend

Open a **NEW** terminal in the `todo-app` folder:

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Run the dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### Step 3: Open the App

Open your browser to **http://localhost:3000**

---

## Troubleshooting

### Port Already in Use

If you see "Port 5000 is already in use":
```bash
# Find and kill the process
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Python Not Found

Make sure Python is in your PATH. Try:
```bash
python3 --version
# or
python --version
```

### npm Not Found

Make sure Node.js is installed:
```bash
node --version
npm --version
```

### CORS Errors

Make sure:
1. Backend is running on port 5000
2. Frontend is running on port 3000
3. Both servers are running simultaneously

### "Cannot GET /"

This means the frontend isn't running. Check that:
```bash
cd frontend
npm run dev
```

---

## What You Should See

When everything is working:

1. **Backend terminal**: Shows Flask server running
2. **Frontend terminal**: Shows Vite dev server running  
3. **Browser**: Brutalist Todo interface at localhost:3000

The app features:
- ✅ Large typographic task display
- ✅ Sharp geometric animations
- ✅ IBM Plex Mono + Spectral fonts
- ✅ Monochrome with electric accent
- ✅ Dramatic hover effects

---

## Stopping the Servers

Press `Ctrl+C` in each terminal to stop the servers.

---

## Next Steps

Once running, try:
- Adding a task with the input field
- Clicking the checkbox to complete a task
- Hovering over todos to see the shadow effect
- Clicking the × to delete a task
- Resizing your browser to see responsive design

---

**Need help?** Check the main README.md for architecture details and design philosophy.
