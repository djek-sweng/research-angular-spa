# Research Angular SPA (and ASP.NET Core web-API)

In this repository I researched a basic fullstack implementation of an [Angular](https://angular.io/) single page application (SPA) and an [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core) web-API.

This application implements a minimal movie database. After successful authentication users can manage their favorite movies in a card view and store them into a database.

An admin user (automatically created) is able to manage all registered application users and their favorite movies.

## Tech-Facts

Angular frontend (client):

- [Routing](https://angular.io/guide/routing-overview)
- Eager and [lazy-loading modules](https://angular.io/guide/lazy-loading-ngmodules)
- [HttpClient](https://angular.io/guide/understanding-communicating-with-http)
- [HttpInterceptor](https://angular.io/guide/http-intercept-requests-and-responses)
- Resolver
- [Guards](https://angular.io/api/router/CanActivateFn)
- [RxJS](https://rxjs.dev/)
- [NgRx](https://ngrx.io/) store with actions, effects, reducers and selectors
- [Redux](https://redux.js.org/) DevTools ready
- [Forms](https://angular.io/guide/forms-overview) (template and reactive)
- [Bootstrap](https://getbootstrap.com/) CSS
- Loading spinner
- Local storage
- Component and module driven development

ASP.NET Core web-API backend (server):

- [ASP.NET Core Identity](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity) (user store)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) (database ORM)
- [Sqlite](https://www.sqlite.org/) database
- Authentication and authorization
- [JWT](https://jwt.io/introduction) Bearer token
- [Swagger](https://swagger.io/) API explorer
- Exception filter
- Usecase and clean-code driven development

## Run Applications

```sh
./run_server.sh   # ASP.NET Core web-API
./run_client.sh   # Angular SPA
```

## Clean Build Artefacts

```sh
./clean.sh        # clean build artefacts
```

## Application Signup and Signin

With the start of the application an admin user is created. The admin credentials are:

- Email: admin@example.com
- Password: pasSworD

You can sign up new users on the authentication page.

## Toolchain Requirements and Versions

```sh
ng version
  Angular CLI: 17.3.0
  Node: 20.11.0
  Package Manager: npm 10.4.0

dotnet --info
  .NET SDKs installed:
  8.0.202

  .NET runtimes installed:
  Microsoft.AspNetCore.App 8.0.3
  Microsoft.NETCore.App 8.0.3

dotnet ef --version
  Entity Framework Core .NET Command-line Tools
  8.0.3

code --version
  1.87.2

  Useful extensions:
    angular.ng-template
    ms-dotnettools.csharp
    qwtel.sqlite-viewer
    dbaeumer.vscode-eslint
    esbenp.prettier-vscode
    editorconfig.editorconfig
    pkief.material-icon-theme
```
