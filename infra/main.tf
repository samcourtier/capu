terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-east-2"
}

# VM setup

variable "ami_name" {}

data "aws_ami" "docker_swarm_manager" {
  most_recent = true

  filter {
    name   = "name"
    values = [var.ami_name]
  }

  owners = ["self"]
}

resource "aws_instance" "server" {
  ami           = data.aws_ami.docker_swarm_manager.id
  instance_type = "t2.micro"

  tags = {
    Name = "CapU"
  }
}

resource "aws_eip" "server" {
  instance = aws_instance.server.id
}

# DNS setup

locals {
  domain = "capitolunited.club"
}

resource "aws_route53_zone" "zone" {
  name = local.domain
}

resource "aws_route53_record" "ns" {
  allow_overwrite = true
  name            = local.domain
  ttl             = 172800
  type            = "NS"
  zone_id         = aws_route53_zone.zone.zone_id

  records = aws_route53_zone.zone.name_servers
}

resource "aws_route53_record" "soa" {
  allow_overwrite = true
  name            = local.domain
  type            = "SOA"
  ttl             = "900"
  zone_id         = aws_route53_zone.zone.zone_id

  records = ["${aws_route53_zone.zone.name_servers[0]} awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
}

resource "aws_route53_record" "a" {
  name    = local.domain
  type    = "A"
  ttl     = "300"
  zone_id = aws_route53_zone.zone.zone_id

  records = [aws_eip.server.public_ip]
}
