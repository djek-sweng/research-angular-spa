#!/bin/sh

cd "./src/server/aspnetcore"

CSPORJ_FILE="MyMDb.WebApi/MyMDb.WebApi.csproj"

dotnet run --project "$CSPORJ_FILE" --launch-profile "https"
