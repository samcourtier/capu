packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "ami_name" {}

variable "public_key_path" {
  default = "~/.ssh/id_ed25519.pub"
}

variable "github_private_key_path" {
  default = "./github-keys/id_ed25519"
}

variable "github_public_key_path" {
  default = "./github-keys/id_ed25519.pub"
}

source "amazon-ebs" "ubuntu" {
  ami_name      = var.ami_name
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
    source      = var.github_private_key_path
    destination = "~/.ssh/id_ed25519"
  }

  provisioner "shell" {
    environment_vars = [
      "PUBLIC_KEY=${file(var.public_key_path)}",
      "GITHUB_PUBLIC_KEY=${file(var.github_public_key_path)}"
    ]

    inline = [
      "echo Updating packages...",
      "sudo apt-get update",
      "sudo apt-get upgrade -y",

      "echo Setting up Docker repository...",
      "sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",

      "echo Installing Docker Engine...",
      "sudo apt-get update",
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io",

      "echo Initializing Docker Swarm...",
      "sudo docker swarm init",

      "echo Adding public keys...",
      "mkdir -p ~/.ssh",
      "echo $PUBLIC_KEY >> ~/.ssh/authorized_keys",
      "echo $GITHUB_PUBLIC_KEY >> ~/.ssh/authorized_keys",

      "echo Done."
    ]
  }
}
