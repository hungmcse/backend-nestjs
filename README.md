# Bachtuoc platform

## 1. Pre-requirement
 
 * Linux or MacOS only
 * Installed docker latest version [Docker](https://www.docker.com/)
 
## 2. How to run

 * `sh dev.sh` to bring the dev stack up (will not start services automatically)
 * `docker ps` to list running container and see container name
 * `sh cbash.sh <container_name>` to get a shell in to specific container
 
## 3.Devbox specific command

> View each source folder readme file for details. Each source folder will have a default `init.sh`
> which docker will automatically run when starting the service. And a `start.sh` file which
> will get executed if received instruction to. ( e.g `sh dev.sh test` will execute every 
> `start.sh` it found in sources root) 
