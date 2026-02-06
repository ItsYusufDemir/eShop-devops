FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Directory.Packages.props .
COPY Directory.Build.props .

COPY src/Identity.API/ Identity.API/
COPY src/Shared/ Shared/
COPY src/eShop.ServiceDefaults/ eShop.ServiceDefaults/

WORKDIR /app/Identity.API

RUN dotnet restore
RUN dotnet publish -o out



FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/Identity.API/out .
ENTRYPOINT ["dotnet", "Identity.API.dll"]