# Cloudwerte

A simple, self hosted cloud utility platform.

## What is Cloudwerte?

Cloudwerte is a lightweight self-hosted cloud platform that integrates various third-party open-source applications into a single unified web interface. It is designed to provide cloud file management, document editing, and note-taking within a simple, easy-to-use environment.

### Features
- File management using NextCloud for cloud storage and file sharing
- Document editing using LibreOffice, and open source alternative to Microsoft Office
- Note-taking using Obsidian
- Web based gateway designed for ease of use and access

## Getting started

For full installation instructions go to `/docs/installation.md`

The default login on startup is:

- Username: admin
- Password: Password1

There is utility in the Settings area to change the password, this will require restarting the web UI containers with the command
```bash
docker restart frontend backend
```

## Adding shared folder to NextCloud

Follow these instructions to add an external "shared" folder to NextCloud, this already exists for LibreOffice on setup. Doing this will allow you to create files in LibreOffice and access them in NextCloud, or vice versa.

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

## Contributing

Please refer to `/docs/contributing.md`