#!/usr/bin/env bash

packer validate .
packer build -force -var-file="variables.hcl" docker-swarm-manager.pkr.hcl