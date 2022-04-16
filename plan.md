# Plan

- [ ] Set up database backups
- [ ] Serve placeholder page from Django instead of NGINX
- [ ] Set up admin site
- [ ] Create basic calendar
  - Two pages: 'Upcoming Rides' and 'Past Rides'
    - Announcements visible on both
    - Upcoming rides includes N recently completed rides
  - Model
    - Settings
      - featured_posts
      - recently_completed_duration
    - Post
      - id
      - title
      - subtitle
      - body
    - Event
      - post
      - departure
      - status
      - attributes
      - event_close
    - EventClose
      - body
      - attributes
    - EventAttribute
      - name
      - value


## Backlog

- [ ] Terraform remote state on S3
- [ ] Increase SECURE_HSTS_SECONDS to 31536000 when site is stable
- [ ] cron job for pulling from main

## Done

- [x] Run server with dedicated capu user instead of ubuntu
- [x] Wire up NGINX - Gunicorn - Django + firewall
- [x] Set up Django with Postgres
- [x] Set up NGINX server w/ HTTPS