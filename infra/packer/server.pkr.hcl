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

  provisioner "file" {
    source      = var.public_ed25519_key_path
    destination = "id_ed25519.pub"
  }

  provisioner "file" {
    source = "files/"
    destination = "."
  }

  provisioner "shell" {
    script = "init.sh"
  }
}
