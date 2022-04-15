packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "server_ami_name" {}
variable "public_ed25519_key_path" {}
variable "server_private_key_path" {}
variable "server_public_key_path" {}

source "amazon-ebs" "ubuntu" {
  ami_name      = var.server_ami_name
  instance_type = "t2.micro"
  region        = "us-east-2"

  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  sources = [
    "source.amazon-ebs.ubuntu"
  ]

  # Local SSH public key to be added to .ssh/authorized_keys
  provisioner "file" {
    source      = var.public_ed25519_key_path
    destination = "id_ed25519.pub"
  }
  
  # Instance's private key
  provisioner "file" {
    source      = var.server_private_key_path
    destination = ".ssh/id_ed25519"
  }

  # Instance's public key
  provisioner "file" {
    source      = var.server_public_key_path
    destination = ".ssh/id_ed25519.pub"
  }

  # Django settings
  provisioner "file" {
    source = "settings.py"
    destination = "settings.py"
  }

  # Django secret key
  provisioner "file" {
    source = "secret_key.txt"
    destination = "secret_key.txt"
  }

  # Systemd socket for communication between NGINX and Gunicorn
  provisioner "file" {
    source = "gunicorn.socket"
    destination = "gunicorn.socket"
  }

  # Gunicorn systemd service
  provisioner "file" {
    source = "gunicorn.service"
    destination = "gunicorn.service"
  }

  # NGINX config
  provisioner "file" {
    source = "nginx.conf"
    destination = "nginx.conf"
  }

  # Placeholder page
  provisioner "file" {
    source = "index.html"
    destination = "index.html"
  }

  # Systemd service to run certbot after deployment
  provisioner "file" {
    source = "init-certbot.service"
    destination = "init-certbot.service"
  }

  # Run initialization script
  provisioner "shell" {
    script = "init.sh"
  }
}
