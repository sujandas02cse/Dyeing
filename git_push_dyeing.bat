@echo off
cd /d E:\Dyeing

echo --------------------------------------
echo Dyeing Project GitHub Uploader Script
echo --------------------------------------

:: Prompt for commit message
set /p msg="Enter commit message: "

:: Add changes
git add .

:: Commit with message
git commit -m "%msg%"

:: Push to main branch
git push origin main

pause
