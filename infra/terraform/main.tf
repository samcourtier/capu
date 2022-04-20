terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.10.0"
    }
  }

  required_version = ">= 1.1.2"
}

provider "aws" {
  profile = "default"
  region  = "us-east-2"
}

variable "server_ami_name" {}
variable "include_stage" { default = false }

locals {
  stage_count = var.include_stage ? 1 : 0
}