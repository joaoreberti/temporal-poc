# Hello World

This is the default project that is scaffolded out when you run `npx @temporalio/create@latest ./myfolder`.

The [Hello World Tutorial](https://learn.temporal.io/getting_started/typescript/hello_world_in_typescript/) walks through the code in this sample.

## Setup temporal locally

1. cd temporal
1. cp .env.example .env
1. docker-compose up -d

### Running this sample

In the root directory

1. `docker-compose up -d`
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.
1. `npm run consumer` to consume from topic that will trigger a signal for the workflow, terminating it
