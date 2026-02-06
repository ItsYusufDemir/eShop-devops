FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/Catalog.API/ Catalog.API/
COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/
COPY src/EventBusRabbitMQ/ EventBusRabbitMQ/
COPY src/IntegrationEventLogEF/ IntegrationEventLogEF/
COPY src/EventBus/ EventBus/
COPY src/Shared/ Shared/


WORKDIR /app/Catalog.API

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/Catalog.API/out .
ENTRYPOINT ["dotnet", "Catalog.API.dll"]