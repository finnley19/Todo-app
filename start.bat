@echo off
echo Starting Brutalist Todo App...
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is required but not installed
    pause
    exit /b 1
)

REM Check Node
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is required but not installed
    pause
    exit /b 1
)

REM Start backend
echo Setting up backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt

echo Starting Flask backend on http://localhost:5000
start /B python app.py

cd ..

REM Start frontend
echo.
echo Setting up frontend...
cd frontend

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

echo Starting React frontend on http://localhost:3000
call npm run dev

pause
