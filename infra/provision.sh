#!/usr/bin/env bash

terraform validate
terraform apply -var-file="variables.hcl"