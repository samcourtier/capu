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
sudo -u postgres createuser capu
sudo -u postgres createdb -O capu capu

echo "Installing Python requirements..."
sudo apt-get install -y \
    python3-pip \
    python3-dev libpq-dev # These are required for psycopg2
sudo pip3 install psycopg2 gunicorn Django

echo "Initializing capu user..."
sudo adduser --disabled-password --gecos "" capu
sudo chown capu:capu settings.py secret_key.txt

echo "Initializing capu Django project..."
sudo -u capu django-admin startproject capu /home/capu/
sudo mv settings.py /home/capu/capu/
sudo mv secret_key.txt /home/capu/
sudo -u capu python3 /home/capu/manage.py check --deploy --fail-level WARNING
sudo -u capu python3 /home/capu/manage.py migrate

echo "Initializing Gunicorn..."
sudo mv gunicorn.service gunicorn.socket /etc/systemd/system/
sudo systemctl enable --now gunicorn.socket
sudo systemctl enable --now gunicorn.service

echo "Installing NGINX..."
sudo apt-get install -y nginx
sudo mv nginx.conf /etc/nginx/nginx.conf
sudo mkdir /var/www/static/
sudo chown capu:capu /var/www/static/
sudo -u capu python3 /home/capu/manage.py collectstatic
sudo mv index.html /var/www/index.html

echo "Configuring HTTPS..."
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo mv init-certbot.service /etc/systemd/system/
sudo systemctl enable init-certbot # This will run certbot on next boot

echo "Initializing firewall..."
sudo ufw allow ssh
sudo ufw allow "Nginx Full"
sudo ufw --force enable

echo "Done."
