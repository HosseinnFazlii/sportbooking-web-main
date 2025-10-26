# Rismun Microfrontend Core (MfCore)

Welcome to Rismun's MfCore, a Microfrontend Core that paves the way for scalable and modular applications with a micro-frontend architecture. This project harnesses the power of client-side microservices, employing a suite of modern technologies including Nx, Next.js, React, Material UI, OAuth2, and JWT.

Rismun MfCore allows you to build independent, loosely coupled modules that can be developed, tested, and deployed separately, reducing complexity and speeding up development cycles.

For more information, please visit [rismun.ir](https://rismun.ir). All rights are reserved by Rismun.

## Architecture Overview

The architecture is organized into three main applications and a shared library:

- **Main Project**: A central hub for managing micro-frontends, handling routing, user access control, and error pages. This project orchestrates other micro-apps and provides a unified interface.

- **Auth Project**: Houses all authentication-related components and flows, including login pages. It leverages OAuth2 and JWT for secure and stateless authentication.

- **Sportbooking Project**: Dedicated to sportbooking and ticketing functionalities, this project provides a separate environment for support-related services.

- **Core-UI Library**: A shared UI library built with Material UI. It contains reusable components, hooks, and utilities, as well as theme and language management tools.

## Getting Started

This project uses [Nx](https://nx.dev), a smart, extensible build framework for monorepos, and React hooks for state management. Below are some steps to get you started:

### Creating the Workspace

Create a new Nx workspace with:

```
npx create-nx-workspace mf-core --pm yarn
```

### Generating a New Project

#### For NextJS

To create a host or remote app (e.g., Main), run:

```
nx g @nx/next:app main
nx g @nx/next:app auth
nx g @nx/next:app sportbooking
```

Next, configure the port for each app by modifying the `project.json` file under the `serve` section.For example: `"port": 4200`


#### For React

To create a host project (e.g., Main), use:

```
nx g @nx/react:host main
```

Specify remote projects with:

```
nx g @nx/react:host main --remotes=auth,sportbooking
```

Or add remote apps later:

```
nx g @nx/react:remote sportbooking --host=main
```

### Generating a New Library

Create a shared library (e.g., Core-UI):

```
nx g @nx/js:lib core-ui
```

### Generating a New Component

Create a new component within a project:

```
nx g @nx/react:component login --project=auth
```

### Running the Project

#### For Next
To run `main`, `auth`, `sportbooking` and `management` projects in parallel, use the following command:

```
nx run-many --parallel --target=serve -c development --projects=main,auth,sportbooking,management --maxParallel=10
```
```
nx run-many --parallel --target=serve -c production --projects=main,auth,sportbooking,management --maxParallel=10
```

#### For React

Serve the main project without reloading on changes to remote projects:

```
nx serve main
```

Or with reloading:

```
nx serve main --devRemotes=auth,sportbooking
```


### Building the Project

#### For Next
To build and export `main`, `auth`, `sportbooking` and `management` projects in parallel, use the following command:

```
nx run-many --parallel --target=build -c production --projects=main,auth,sportbooking,management --maxParallel=10
```
```
nx run-many --parallel --target=export -c production --projects=main,auth,sportbooking,management --maxParallel=10
```

### Deploy the Project
#### For Next
To deploy CSR, use the following command:

```
cp -rf dist/apps/auth/exported dist/apps/main/exported/apps/auth
```
```
cp -rf dist/apps/sportbooking/exported dist/apps/main/exported/apps/sportbooking
```
```
cp -rf dist/apps/management/exported dist/apps/main/exported/apps/management
```
```
serve -s dist/apps/main/exported
```

### Build with Docker
To deploy CSR with Docker, use the following command:
```
docker build -t web-client-build-cache -f Dockerfile.builder .
```
```
docker build --target main -t rismun/sportbooking/web-client:latest -f Dockerfile.csr .
```
```
docker run --network=localnet -p 80:80 --name web-client  -dit --restart unless-stopped -d rismun/sportbooking/web-client
```

## Additional Docker Commands

To remove unused images:
```
docker image prune
```

## Additional Nx Capabilities

Nx offers a variety of powerful features to streamline your development process:

- **State Management**: We use React hooks for managing application state. [Learn more](https://reactjs.org/docs/hooks-intro.html).

- **Authentication**: We handle authentication using OAuth2 and JWT protocols. [Learn more about OAuth2](https://oauth.net/2/).

- **Deployment**: Build your application with `nx build demoapp`. The build artifacts will be stored in the `dist/` directory.

- **Continuous Integration**: Set up CI with Nx's built-in capabilities. It supports remote caching and task distribution. [Learn more](https://nx.dev/recipes/ci).

- **Editor Integration**: Use the Nx Console extensions for a better development experience. It provides autocomplete support, a UI for exploring and running tasks & generators, and more.

- **Generators and Tasks**: Use commands like `nx list`, `nx run-many`, `nx <target> <project>` to generate code, execute tasks, and more.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details on how to contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
