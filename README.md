### My Movie Database - Angular SPA and ASP.NET Core web-API

In this repository I show a fullstack basic implementation of an [Angular](https://angular.io/) single page application (SPA) and an [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core) web-API.

This application implements a minimal movie database. After successful authentication users can manage their favorite movies in a card view and store them into a database.

An admin user (automatically created) is able to manage all registered application users and their favorite movies.

#### **Tech-Facts**

Angular frontend (client):

- Routing
- Eager and lazy loading modules
- HttpClient
- HttpInterceptor
- Resolver
- Guards
- RxJS
- NgRx store with actions, effects, reducers and selectors
- Redux DevTools ready
- Forms (template and reactive)
- Local storage
- Bootstrap CSS
- Loading spinner
- Component and module driven development

ASP.NET Core web-API backend (server):

- ASP.NET Core Identity (user store)
- Entity Framework Core (database ORM)
- Sqlite database
- Authentication and authorization
- Jwt Bearer token
- Swagger API explorer
- Exception filter
- Usecase and clean-code driven development

#### **Run Applications**

```sh
$ ./run_spa.sh  # Angular SPA
$ ./run_api.sh  # ASP.NET Core web-API
```

#### **Application Sign-Up and Sign-In**

With the start of the application an admin user is created. The admin credentials are:

- Email: admin@example.com
- Password: pasSworD

You can sign up new users on the authentication page.

#### **Toolchain Requirements and Versions**

```sh
$ ng version
    Angular CLI: 16.1.8
    Node: 18.17.0
    Package Manager: npm 9.8.1

$ dotnet --info
    .NET SDKs installed:
    7.0.400

    .NET runtimes installed:
    Microsoft.AspNetCore.App 7.0.10
    Microsoft.NETCore.App 7.0.10

$ dotnet ef --version
    Entity Framework Core .NET Command-line Tools
    7.0.10

$ sqlite3 --version
    3.39.5
```
