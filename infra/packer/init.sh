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

echo "Initializing database..."
sudo apt-get install -y postgresql awscli
if [[ "$SERVER" == "stage" ]]; then
    sudo -u postgres createuser capu
    sudo -u postgres createdb -O capu capu
    sudo chown root:root shutdown
    sudo mv shutdown /etc/cron.d/
else
    # TODO: Check if /dev/xvdf is formatted, populated and do a full DB init
    # if not
    sudo mkdir /mnt/data
    sudo chown postgres:postgres /mnt/data
    echo "/dev/xvdf /mnt/data xfs defaults,nofail 0 2" | sudo tee -a /etc/fstab
    # sudo mkfs -t xfs /dev/xvdf
    sudo mount -a
    sudo systemctl stop postgresql
    # sudo mv /var/lib/postgresql/12/main /mnt/data
    sudo rm -rf /var/lib/postgres/12/main
    sudo -u postgres ln -s /mnt/data /var/lib/postgresql/12/main
    # sudo rm -rf /var/lib/postgresql/12/mainbak
    sudo chown root:root backup
    sudo mv backup /etc/cron.d/
fi

echo "Installing Python requirements..."
sudo apt-get install -y \
    python3-pip \
    python3-dev libpq-dev # These are required for psycopg2
sudo pip3 install psycopg2 gunicorn Django

echo "Initializing capu user..."
sudo adduser --disabled-password --gecos "" capu
sudo chown capu:capu -R capu settings.py secret_key.txt

echo "Initializing capu Django project..."
sudo rsync -a capu/ /home/capu/
sudo rm -rf capu/
sudo mv settings.py /home/capu/capu/
sudo mv secret_key.txt /home/capu/
sudo -u capu python3 /home/capu/manage.py check --deploy --fail-level WARNING
if [[ "$SERVER" == "stage" ]]; then
    sudo -u capu python3 /home/capu/manage.py migrate
fi

echo "Initializing Gunicorn..."
sudo mv gunicorn.service gunicorn.socket /etc/systemd/system/
sudo systemctl enable gunicorn.socket
sudo systemctl enable gunicorn.service

echo "Installing NGINX..."
sudo apt-get install -y nginx
sudo mv nginx.conf /etc/nginx/nginx.conf
sudo mkdir /var/www/static/
sudo chown capu:capu /var/www/static/
sudo -u capu python3 /home/capu/manage.py collectstatic

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
