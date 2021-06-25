#!/usr/bin/env bash

packer validate -var-file="shared-variables.hcl" .
packer build -force -var-file="shared-variables.hcl" docker-swarm-manager.pkr.hcl