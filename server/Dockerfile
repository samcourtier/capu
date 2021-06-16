FROM mcr.microsoft.com/dotnet/sdk:5.0

WORKDIR /app
COPY ./ /app

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

CMD ["dotnet", "watch", "run", "--no-launch-profile"]