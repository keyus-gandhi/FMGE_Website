@echo off
echo Installing dependencies if needed...
call npm install
echo.
echo Starting development server...
call npm run dev
pause

