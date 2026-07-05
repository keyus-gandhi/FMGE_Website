@echo off
echo ========================================
echo Starting AI Study Tutor Python Backend
echo ========================================
echo.

cd /d "%~dp0"

:: Check if Python virtual environment exists, if not create it
if not exist venv (
    echo Creating python virtual environment (venv)...
    python -m venv venv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment. Ensure Python is installed and in your PATH.
        pause
        exit /b 1
    )
)

:: Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

:: Install dependencies
echo Installing/Updating dependencies from requirements.txt...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install Python dependencies.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting FastAPI Server on http://localhost:8000
echo ========================================
echo.
python main.py

pause
