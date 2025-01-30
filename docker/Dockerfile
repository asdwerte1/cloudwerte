# Base image
FROM guacamole/guacamole

# install apache web server
RUN apt-get update && apt-get install -y apache2 && rm -rf /var/lib/apt/lists/*

# Move web UI into apache web root
COPY ../webui/build /var/www/html/

# Set Firefox default home to UI in contianer
RUN mkdir -p /root/.mozilla/firefox/default-profile && \
echo 'user_pref("browser.startup.homepage", "http://localhost");' >> /root/.mozilla/firefox/default-profile/prefs.js

# Start apache and guacamole at boot
CMD service apache2 start && /op/guacamole/bin/start.sh