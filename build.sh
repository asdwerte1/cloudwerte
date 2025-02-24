#!/bin/bash

# Shutdown containers and network
echo "Shutting down"
docker compose down

# Remove containers data
sudo rm -r data
sudo rm -r backend/data

# Remove existing containers
echo "Removing existing containers"
docker image rm asdwerte1/cloudwerte-backend:latest asdwerte1/cloudwerte-frontend:latest

# Build compose
docker compose up -d

# Ensure LibreOffice Shared folder works as intended
echo "Fixing LibreOffice shared folder permissions..."

# Ensure LibreOffice can write to /shared
docker exec -it libreoffice sh -c "chown -R 1000:1000 /shared && chmod -R 777 /shared"

# Verify the permissions were set correctly
docker exec -it libreoffice ls -ld /shared

echo "Permissions fixed! LibreOffice can now save files to /shared."