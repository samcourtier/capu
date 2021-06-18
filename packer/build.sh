#!/user/bin/env bash
packer validate .
packer build -force aws-ubuntu.pkr.hcl