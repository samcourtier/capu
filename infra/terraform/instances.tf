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
  ami                  = data.aws_ami.server.id
  instance_type        = "t2.micro"
  security_groups      = [aws_security_group.server.name]
  iam_instance_profile = aws_iam_instance_profile.ec2.name

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