FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/OrderProcessor/ OrderProcessor/

COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/
COPY src/EventBusRabbitMQ/ EventBusRabbitMQ/ 
COPY src/EventBus/ EventBus/ 
COPY src/Shared/ Shared/ 



WORKDIR /app/OrderProcessor

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/OrderProcessor/out .
ENTRYPOINT ["dotnet", "OrderProcessor.dll"]