#!/bin/bash

set -e

echo "Adding public key to .ssh/authorized_keys..."
mkdir -p ~/.ssh
cat id_ed25519.pub >>~/.ssh/authorized_keys
rm id_ed25519.pub

echo "Upgrading packages..."
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get update

echo "Installing PostgreSQL..."
sudo apt-get install -y postgresql
sudo -u postgres createuser ubuntu
sudo -u postgres createdb -O ubuntu capu

echo "Installing Python requirements..."
sudo apt-get install -y \
    python3-pip \
    python3-dev libpq-dev # These are required for psycopg2
pip3 install psycopg2 gunicorn Django

echo "Initializing capu Django project..."
.local/bin/django-admin startproject capu
mv settings.py capu/capu/settings.py
mv secret_key.txt capu/secret_key.txt
python3 capu/manage.py check --fail-level WARNING --deploy
python3 capu/manage.py migrate

echo "Initializing Gunicorn..."
sudo mv gunicorn.service gunicorn.socket /etc/systemd/system
sudo systemctl enable --now gunicorn.socket
sudo systemctl enable --now gunicorn.service

echo "Installing NGINX..."
sudo apt-get install -y nginx
sudo mv nginx.conf /etc/nginx/nginx.conf
sudo mkdir /var/www/static
sudo chown ubuntu:ubuntu /var/www/static
python3 capu/manage.py collectstatic
sudo mv index.html /var/www/index.html

echo "Configuring HTTPS..."
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo mv init-certbot.service /etc/systemd/system/init-certbot.service
sudo systemctl enable init-certbot # This will run certbot on next boot

echo "Initializing firewall..."
sudo ufw allow ssh
sudo ufw allow "Nginx Full"
sudo ufw --force enable

echo "Done."
