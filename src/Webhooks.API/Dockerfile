FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/Webhooks.API/ Webhooks.API/

COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/
COPY src/EventBusRabbitMQ/ EventBusRabbitMQ/ 
COPY src/EventBus/ EventBus/ 
COPY src/Shared/ Shared/ 
COPY src/IntegrationEventLogEF/ IntegrationEventLogEF/



WORKDIR /app/Webhooks.API

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/Webhooks.API/out .
ENTRYPOINT ["dotnet", "Webhooks.API.dll"]