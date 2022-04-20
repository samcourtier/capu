data "aws_ami" "stage" {
  most_recent = true

  filter {
    name   = "name"
    values = ["${var.server_ami_name} - Stage"]
  }

  owners = ["self"]
}

data "aws_ami" "prod" {
  most_recent = true

  filter {
    name   = "name"
    values = ["${var.server_ami_name} - Prod"]
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

resource "aws_instance" "stage" {
  count = local.stage_count

  ami                  = data.aws_ami.stage.id
  instance_type        = "t2.micro"
  security_groups      = [aws_security_group.server.name]
  iam_instance_profile = aws_iam_instance_profile.ec2_read_backups.name

  tags = {
    Name = "Cap U - Stage"
  }
}

resource "aws_instance" "prod" {
  ami                  = data.aws_ami.prod.id
  instance_type        = "t2.micro"
  security_groups      = [aws_security_group.server.name]
  iam_instance_profile = aws_iam_instance_profile.ec2_backups.name

  tags = {
    Name = "Cap U - Prod"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_eip" "prod" {
  instance = aws_instance.prod.id
}

output "stage_ip" {
  value = var.include_stage ? aws_instance.stage[0].public_ip : null
}

output "prod_ip" {
  value = aws_eip.prod.public_ip
}