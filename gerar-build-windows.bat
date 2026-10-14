@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules call npm install
if errorlevel 1 pause & exit /b 1
call npm run build
if errorlevel 1 pause & exit /b 1
echo Build pronto na pasta dist.
pause
