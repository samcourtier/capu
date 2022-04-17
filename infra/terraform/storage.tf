resource "aws_ebs_volume" "data_prod" {
  availability_zone = "us-east-2b"
  size              = 1

  tags = {
    Name = "Prod database data directory"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_volume_attachment" "data_prod" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.data_prod.id
  instance_id = aws_instance.prod.id
}

resource "aws_s3_bucket" "backups" {
  bucket = "capu-backups"
  acl    = "private"

  tags = {
    Name = "Cap U Backups"
  }

  lifecycle_rule {
    id      = "expiration"
    enabled = true

    expiration {
      days = 90
    }
  }
}

resource "aws_iam_policy" "backups" {
  name        = "backups"
  description = "Allows all S3 actions on the backups bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowAllS3ActionsOnBackupsBucket"
        Effect = "Allow"
        Action = "s3:*"
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.backups.id}",
          "arn:aws:s3:::${aws_s3_bucket.backups.id}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "ec2" {
  name = "ec2"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Action = "sts:AssumeRole"
        Principal = {
          Service = [
            "ec2.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "ec2_backups" {
  name       = "ec2"
  roles      = [aws_iam_role.ec2.name]
  policy_arn = aws_iam_policy.backups.arn
}

resource "aws_iam_instance_profile" "ec2" {
  name = "ec2"
  role = aws_iam_role.ec2.name
}
