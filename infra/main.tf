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

variable "public_key_path" {}
variable "ami_name" {}

data "aws_ami" "docker_swarm_manager" {
  most_recent = true

  filter {
    name   = "name"
    values = [var.ami_name]
  }

  owners = ["self"]
}

resource "aws_security_group" "server" {

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_key_pair" "server" {
  public_key = file(var.public_key_path)
}

resource "aws_instance" "server" {
  ami             = data.aws_ami.docker_swarm_manager.id
  instance_type   = "t2.micro"
  key_name        = aws_key_pair.server.id
  security_groups = [aws_security_group.server.name]

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

  records = [
    "ns-975.awsdns-57.net.",
    "ns-1871.awsdns-41.co.uk.",
    "ns-466.awsdns-58.com.",
    "ns-1491.awsdns-58.org."
  ]
}

resource "aws_route53_record" "soa" {
  allow_overwrite = true
  name            = local.domain
  type            = "SOA"
  ttl             = 900
  zone_id         = aws_route53_zone.zone.zone_id

  records = ["ns-975.awsdns-57.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
}

resource "aws_route53_record" "a" {
  name    = local.domain
  type    = "A"
  ttl     = 300
  zone_id = aws_route53_zone.zone.zone_id

  records = [aws_eip.server.public_ip]
}
