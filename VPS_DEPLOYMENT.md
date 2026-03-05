# VPS Deployment Guide for Portfolio

This document provides step-by-step instructions on deploying the Dockerized Next.js portfolio application to a VPS (e.g., DigitalOcean, Hetzner, AWS EC2, Linode).

## Prerequisites on your VPS

Before starting, ensure you have ssh access to your VPS and it is running a relatively modern Linux distribution (Ubuntu 22.04+ or Debian 12+ recommended).

1.  **Update your system packages:**
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

2.  **Install Docker and Docker Compose:**
    ```bash
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh

    # Verify installation
    docker --version
    docker compose version
    ```

## Deployment Steps

1.  **Clone or Copy your project to the VPS:**
    You can transfer files via Git (if your code is pushed to a repository) or using `scp`/`rsync`.
    ```bash
    # Assuming Git
    git clone https://github.com/your-username/portfolio.git
    cd portfolio
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory (alongside `docker-compose.yml`) containing all your production secrets. You do not strictly need the database URL if you kept the default docker-compose network credentials, but you will need API keys.

    ```bash
    cp .env.example .env
    nano .env
    ```
    *Ensure `DATABASE_URL` matches your docker-compose config:* `DATABASE_URL="postgresql://postgres:postgres@db:5432/portfolio?schema=public"`

3.  **Start the Services:**
    Run Docker compose in detached mode to build the Next.js app image and spin it up along with the Postgres database.
    ```bash
    # This will take a few minutes the first time it builds the image
    docker compose up -d --build
    ```

4.  **Database Migration (Initial Setup):**
    For Prisma to work, your tables must exist in the database. You can run migrations directly against the database container.
    ```bash
    # Get a shell inside the web container to run prisma commands
    # Alternatively, you can use docker compose exec web npx prisma db push
    docker compose exec web npx prisma migrate deploy
    
    # Or if you just need to push schema without migrations tracking:
    # docker compose exec web npx prisma db push
    ```
    *(Note: If you copied prisma to the docker container during build as done in the `Dockerfile`, these commands should work from inside the `web` container.)*

5.  **Verify Deployment:**
    Check standard output logs if there are issues.
    ```bash
    docker compose logs -f
    ```
    Visit your VPS IP address at `http://YOUR_VPS_IP:3000`.

## (Optional) Reverse Proxy & SSL

To point a domain name and add HTTPS (SSL), install Caddy or Nginx on your VPS.

**Using Caddy (Simplest approach):**
1. Install Caddy (`sudo apt install caddy`).
2. Edit `/etc/caddy/Caddyfile`:
    ```
    yourdomain.com {
        reverse_proxy localhost:3000
    }
    ```
3. Restart Caddy (`sudo systemctl restart caddy`).
