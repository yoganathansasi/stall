@echo off
title Sasi Tea Stall - Project Runner

echo ===================================================
echo Sasi Tea Stall - Premium Tea Shop Website
echo ===================================================
echo.

:: Check Node.js
where.exe node >nul 2>nul
if %errorlevel% equ 0 goto node_ok
echo [Error] Node.js is not installed or not in PATH. Please install Node.js (v18+).
pause
exit /b 1

:node_ok

:: Check Go
where.exe go >nul 2>nul
if %errorlevel% equ 0 goto go_ok

echo [Warning] Go SDK is not found in PATH.
echo Searching in user local programs...

if exist "%USERPROFILE%\AppData\Local\Microsoft\WindowsApps\go.exe" goto add_windowsapps
if exist "%USERPROFILE%\AppData\Local\Programs\Go\bin\go.exe" goto add_usergo
if exist "C:\Program Files\Go\bin\go.exe" goto add_systemgo

echo [Warning] Go is not installed or not in PATH.
echo If you have just installed Go, please restart this command prompt.
echo Attempting to run backend using Go anyway, but it may fail.
goto go_ok

:add_windowsapps
set "PATH=%PATH%;%USERPROFILE%\AppData\Local\Microsoft\WindowsApps"
echo Found Go in WindowsApps! Added to local PATH.
goto go_ok

:add_usergo
set "PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Go\bin"
echo Found Go in Local Programs! Added to local PATH.
goto go_ok

:add_systemgo
set "PATH=%PATH%;C:\Program Files\Go\bin"
echo Found Go in C:\Program Files\Go! Added to local PATH.
goto go_ok

:go_ok

echo [1/3] Setting up Backend dependencies...
cd backend
:: Download dependencies (will run if Go is available)
go get github.com/jackc/pgx/v5@v5.5.5
cd ..

echo [2/3] Setting up Frontend dependencies...
if exist "frontend\node_modules" goto skip_install
echo Node modules not found. Installing frontend packages...
cd frontend
call npm.cmd install
cd ..

:skip_install

echo [3/3] Launching Backend and Frontend...
echo.
echo Starting Go API Backend...
start "SMK Backend API (Go)" cmd /k "cd backend && set PORT=8080 && go run cmd/server/main.go"

echo Starting Next.js Frontend...
start "SMK Frontend (Next.js)" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo ===================================================
echo Application successfully launched!
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8080/health
echo ===================================================
echo.
pause
