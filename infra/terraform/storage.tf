# Production database persistence 
# -------------------------------

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
  device_name                    = "/dev/sdf"
  volume_id                      = aws_ebs_volume.data_prod.id
  instance_id                    = aws_instance.prod.id
  stop_instance_before_detaching = true
}

# Backups
# -------

resource "aws_s3_bucket" "backups" {
  bucket = "capu-backups"
  acl    = "private"

  tags = {
    Name = "Cap U Backups"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "expiration" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "expiration"
    status = "Enabled"

    expiration {
      days = 90
    }
  }
}

# Production Backups

resource "aws_iam_role" "ec2_backups" {
  name = "ec2-backups"

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

resource "aws_iam_policy_attachment" "ec2_backups" {
  name       = "ec2-backups"
  roles      = [aws_iam_role.ec2_backups.name]
  policy_arn = aws_iam_policy.backups.arn
}

resource "aws_iam_instance_profile" "ec2_backups" {
  name = "ec2-backups"
  role = aws_iam_role.ec2_backups.name
}

# Staging backup downloads

resource "aws_iam_role" "ec2_read_backups" {
  name = "ec2-read-backups"

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

resource "aws_iam_policy" "read_backups" {
  name        = "read-backups"
  description = "Allow S3 read actions on the backups bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowS3ReadActionsOnBackupsBucket"
        Effect = "Allow"
        Action = ["s3:List*", "s3:Get*"]
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.backups.id}",
          "arn:aws:s3:::${aws_s3_bucket.backups.id}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "ec2_read_backups" {
  name       = "ec2-read-backups"
  roles      = [aws_iam_role.ec2_read_backups.name]
  policy_arn = aws_iam_policy.read_backups.arn
}

resource "aws_iam_instance_profile" "ec2_read_backups" {
  name = "ec2-read-backups"
  role = aws_iam_role.ec2_read_backups.name
}
