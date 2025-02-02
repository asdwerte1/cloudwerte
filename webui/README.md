# Web UI for Cloudwerte Gateway

This acts as the frontend for the Cloudwerte gateway. The UI is built with **React**.

It is designed to provide a simple web-based interface for launching the containers included within this package.

## Features
- **Dynamic configuration**: Loads container details from `containers.json` 
    - To add **custom containers**, update `containers.json` and modify `docker-compose.yml` accordingly.
- **Runs inside the Gateway Container**:
    - Ubuntu-based environment with an **Apache web server**
    - Accessible inside the container via `http://localhost`.

---

## Quick setup

To quickly setup **out the box**, run:
```bash
docker compose up -d
```

### What this does:
- Creates a **docker network**
- Deploys **all containers** pulling when needed
- Starts the **Gateway Container**

Once deployed:
- Access the **Gateway Container** in a browser (may require your own network setup)
- Inside the container, open a browser and go to `http://localhost` to launch the Web UI.

---
## Deveopment setup

Steps to take to update the UI for custom setup

### Install dependencies
Ensure that `Node.js` and `npm` are boht installed:
```bash
cd webui
npm install
```
### Run in Development Mode

Ensure that the app loads correctly
```bash
npm start
```
- The UI should be available at `http://localhost:3000`
- Any changes you make and save will auto-reload

### Build for Production
Run command to create build version
```bash
npm run build
```

- Generates static files in `webui/build`
- These are copied into the gateway container during Docker build

### Run the following docker command to build updated customised version 

After modifying the Web UI, rebuild the docker image (this may take some time):
```bash
docker build container-name -f docker/Dockerfile .
```

Then deploy the updated verison:
``` bash
docker compose up -d --build
```

---

## How it connects to the Gateway Container
- The web ui is served by an Apache server within the container
- Inside the container the UI is access at `http://localhost`
- External access requires eiter
    - A domain setup
    - VPN
    - Static public IP

---

## Notes
- The containers must be running for the UI to function correctly
- If modifying the `containers.json`, restart the Web UI for changes to take effect

---

## License

Released under the **GNU General Public License v3.0