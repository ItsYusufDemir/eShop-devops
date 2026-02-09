FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/WebhookClient/ WebhookClient/

COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/

WORKDIR /app/WebhookClient

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/WebhookClient/out .
ENTRYPOINT ["dotnet", "WebhookClient.dll"]