#!/bin/bash

set -e

echo "Adding public key to authorized_keys"
mkdir -p ~/.ssh
cat id_ed25519.pub >>~/.ssh/authorized_keys

echo "Upgrading packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "Installing NGINX..."
sudo apt-get install -y nginx
sudo mv index.nginx-debian.html /var/www/html/index.nginx-debian.html

echo "Configuring HTTPS..."
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo mv init-certbot.service /etc/systemd/system/init-certbot.service
sudo systemctl enable init-certbot

echo "Done."
