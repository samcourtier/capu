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


variable "server_ami_name" {}

# VM setup

data "aws_ami" "server" {
  most_recent = true

  filter {
    name   = "name"
    values = [var.server_ami_name]
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

resource "aws_instance" "prod" {
  ami             = data.aws_ami.server.id
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.server.name]

  tags = {
    Name = "Cap U - Prod"
  }
}

resource "aws_eip" "prod" {
  instance = aws_instance.prod.id
}

output "prod_ip" {
  value = aws_eip.prod.public_ip
}

# DNS setup

locals {
  domains = [
    "capitolunited.org",
    "capitolunited.club",
    "capu.club",
  ]
}

resource "aws_route53_zone" "zone" {
  for_each = toset(local.domains)

  lifecycle {
    prevent_destroy = true
  }

  name = each.key
}

output "name_servers" {
  value = {
    for d in local.domains : d => aws_route53_zone.zone[d].name_servers
  }
  description = "The name servers in the 'Registered domains' section of the AWS Route 53 console need to match these."
}

resource "aws_route53_record" "a" {
  for_each = toset(local.domains)

  name    = ""
  type    = "A"
  ttl     = 300
  zone_id = aws_route53_zone.zone[each.key].zone_id

  records = [aws_eip.prod.public_ip]
}

resource "aws_route53_record" "www" {
  for_each = toset(local.domains)

  name    = "www"
  type    = "CNAME"
  ttl     = 300
  zone_id = aws_route53_zone.zone[each.key].zone_id

  records = [each.key]
}
