FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/WebApp/ WebApp/

COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/
COPY src/EventBusRabbitMQ/ EventBusRabbitMQ/ 
COPY src/EventBus/ EventBus/ 
COPY src/Shared/ Shared/ 
COPY src/WebAppComponents WebAppComponents/
COPY src/Basket.API/Proto Basket.API/Proto/ 


WORKDIR /app/WebApp

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/WebApp/out .
ENTRYPOINT ["dotnet", "WebApp.dll"]