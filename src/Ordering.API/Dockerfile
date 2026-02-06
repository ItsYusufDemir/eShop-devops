FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/Ordering.API/ Ordering.API/

COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/
COPY src/EventBusRabbitMQ/ EventBusRabbitMQ/ 
COPY src/EventBus/ EventBus/ 
COPY src/Shared/ Shared/ 
COPY src/IntegrationEventLogEF/ IntegrationEventLogEF/
COPY src/Ordering.Domain/ Ordering.Domain/
COPY src/Ordering.Infrastructure/ Ordering.Infrastructure/

WORKDIR /app/Ordering.API

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/Ordering.API/out .
ENTRYPOINT ["dotnet", "Ordering.API.dll"]