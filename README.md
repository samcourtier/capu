# Cap U Site

## Develop

1. [Install Node](https://nodejs.org/en/)
1. [Install Docker](https://docs.docker.com/engine/install/).
2. [Install Docker Compose](https://docs.docker.com/compose/install/).
3. Clone the repo and `cd` into it.
4. Install the Node packages: `$ npm install` [^1]
5. Fire up the dev environment: `$ docker-compose up`.
6. Check out any of: 
   * the front-end at `localhost:3000`, 
   * the back-end API docs at `localhost:8000/swagger`,
   * the DB admin at `localhost:8080` (select Postgres and enter `db`, `capu`, `capu`, `capu`).
7. Edit `client/src/App.tsx` to futz with the front-end and `server/Controllers` to futz with the back-end API endpoints.

Hit `Ctrl+C` and run `$ docker-compose down` when you're done.

Stuff not working (especially after pulling)? Try:

* running `docker-compose up --build -V` to rebuild the dev environment -- this will also blow away any changes you've made to the database,
* running `npm install` to update the nodejs packages,
* editing the `ports:` in `docker-compose.yml` -- if you're already using one of the ports on the left of the colons, `$ docker-compose` will get ornery,
* Restarting Docker Compose (`Ctrl+C`, `$ docker-compose down`, `$ docker-compose up`) -- especially when the front-end hot-compile/reload chokes on stale code.

[^1]: Unfortunately, due to the limitations of Docker Compose volume mapping, the `node_modules` directory needs to be shared between the host and the container.

## TODO(SGC)

* Setup CI/CD (probably GitHub runner)
* Test new DNS/EC2 config after the DNS records have had a couple days to propagate
* Setup Traefik
* Deploy WIP app
* Setup DB persistence and backups
* Look into Open API codegen for back-to-front compile-time type-checking