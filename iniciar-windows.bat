@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ==============================================
echo  Dra. Fabricia Celestina - Site React
echo ==============================================
where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao encontrado. Instale Node.js 20 LTS em https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando dependencias do projeto...
  call npm install
  if errorlevel 1 (
    echo ERRO ao instalar dependencias. Confira sua conexao com a internet.
    pause
    exit /b 1
  )
)
call npm run assets:download
call npm run dev
pause
