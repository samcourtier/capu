# Plan

- [ ] Script production DB import
- [ ] Create basic calendar
  - Two pages: 'Upcoming Rides' and 'Past Rides'
    - Announcements visible on both
    - Upcoming rides includes N recently completed rides

## Backlog

- [ ] Terraform remote state on S3
- [ ] Increase SECURE_HSTS_SECONDS to 31536000 when site is stable
- [ ] cron job for pulling from main
- [ ] Check on backups
- [ ] Persist SSL certs
- [ ] Add rich editing
- [ ] Figure out how to share parts of settings.py between dev/stage/prod
- [ ] Handle uninitialized EBS volumes in init.sh
- [ ] Address duplication between init.sh and deploy script
- [ ] Address duplication between ./deploy and ./stage

## Done

- [x] Script source code deployment
- [x] Fix EBS postgres mounting
- [x] Set up staging environment
- [x] Create bare-bones, flexible posting system to crowdsource feature design
- [x] Set up admin site
- [x] Serve placeholder page from Django instead of NGINX
- [x] Prevent EBS volume destroy
- [x] Set up database backups
- [x] Store postgres data on EBS volume
- [x] Run server with dedicated capu user instead of ubuntu
- [x] Wire up NGINX - Gunicorn - Django + firewall
- [x] Set up Django with Postgres
- [x] Set up NGINX server w/ HTTPS