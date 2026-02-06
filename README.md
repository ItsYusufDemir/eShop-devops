# eShop – Containerized with Docker Compose

This is Microsoft's [eShop](https://github.com/dotnet/eShop) reference application, which I containerized manually using Docker and Docker Compose to develop my DevOps skills.

The original project uses .NET Aspire for orchestration. I replaced that with a full `docker-compose.yml` setup including custom Dockerfiles for all 8 services, nginx as a reverse proxy, and infrastructure containers (PostgreSQL, Redis, RabbitMQ).

## Architecture

| Service | Description |
|---|---|
| **webapp** | Blazor frontend (behind nginx) |
| **identity-api** | Duende IdentityServer (OAuth/OIDC) |
| **catalog-api** | Product catalog service |
| **basket-api** | Shopping basket (gRPC + Redis) |
| **ordering-api** | Order management |
| **order-processor** | Background order processing |
| **payment-processor** | Payment simulation |
| **webhooks-api** | Webhook subscriptions |
| **nginx** | Reverse proxy |
| **db** | PostgreSQL (pgvector) |
| **cache** | Redis |
| **queue** | RabbitMQ |

## Code Change

A minor change was made in `src/WebApp/Extensions/Extensions.cs` to support split internal/external identity URLs. This allows the webapp to fetch OIDC metadata directly from `identity-api` inside the Docker network, while browser redirects go to the host-exposed URL. Without this, OpenID Connect authentication fails in a containerized setup.

## Running

```bash
cp .env.example .env   # configure secrets
docker compose up --build
```

- **Web app:** http://localhost
- **Identity:** http://localhost:5223
- **RabbitMQ UI:** http://localhost:15672

## Credits

Based on [dotnet/eShop](https://github.com/dotnet/eShop) by Microsoft.
