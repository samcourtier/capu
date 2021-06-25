#!/usr/bin/env bash

set -e

terraform validate
terraform apply -var-file="shared-variables.hcl"