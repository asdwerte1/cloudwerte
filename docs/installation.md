# Installation Guide

This guide will walk you through setting up Cloudwerte on your server.

## Prerequisites

Before installing, ensure you have:
- Docker and Docker Compose installed
- A Linux environment to run the package in
- A domain name (optional, for external access)

## Quick Installation

Clone the repository:
```bash
git clone https://github.com/asdwerte1/cloudwerte.git"
cd cloudwerte
```

Run the shell script to build the app.

```bash
./build.sh
```

This will pull all required packages, note on first run you may see some error messages, this is fine as it is simply attempting to remove old containers that do not yet exist.

Depending on your connection speed this may take some time.

Part of the setup proces will modify the LibreOffice container to have write access to a shared folder - follow the instructions below to allow NextCloud access to that same folder, allowing both apps shared access to files.

Access the **gateway** in a browser within the container at `http://localhost:3080`

For external access, ensure your network is configured correctly.For external access, ensure your network is configured correctly.

## Adding shared folder to NextCloud

1. Click your profile icon in the top right corner then click Apps.
2. On the left side bar click Disabled apps, then find External storage support and click Enable.
3. Click your icon again and go to Administration settings.
4. In the side bar click External storage.
5. Choose a name for the folder (e.g. Shared).
6. Click Add storage drop down and select local.
7. In the configuration drop down type "/shared"
8. Set your permission to All people.
9. Click the tick icon to save.
10. Verify by going to the Files area, you should see your new shared folder for LibreOffice.