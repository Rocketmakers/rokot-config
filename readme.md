# rokot-config

[![Greenkeeper badge](https://badges.greenkeeper.io/Rocketmakers/rokot-config.svg)](https://greenkeeper.io/)

Rokot - [Rocketmakers](http://www.rocketmakers.com/) TypeScript NodeJs Platform

## Introduction

A typescript based Configuration Provider for nodejs applications

This package provides 3 `IConfigurationProvider` options:

1. InProcConfigProvider - simple in memory provider
2. FetchConfigProvider - provides an agnostic `fetch` service
3. ConsulConfigProvider - provides a `consul` config service (derived from FetchConfigProvider)

```typescript
interface IConfigurationProvider {
    get<T>(key: string): Promise<T>;
}
```

> Only the InProc Provider caches configuration - the Fetch/Consul provider always `fetch` a fresh value on each call

### Platform Requirements
>The Rokot platform components heavily rely on usage of the [typings](https://github.com/typings/typings) utility for typescript definitions management.
If you don't have `typings` installed:
```
npm i typings -g
```

## Getting Started

### Installation
Install via `npm`
```
npm i rokot-config --save
```

### Typings

You should also install these ambient dependencies:
>NOTE: you might already have some of these ambient dependencies installed!

```
typings install isomorphic-fetch es6-promise -SA
```

## Example: Fetch

```typescript
import {FetchConfigProvider} from "rokot-config";

const configProvider = new FetchConfigProvider(k => `http://localhost:4400/key/${k}`)

configProvider.get<string>("key").then(value => {
  // value = <fetch provided value>
}).catch(err => {
  // 'key not found' or 'unable to connect to server'
})
```

You can modify the `fetch` via a `RequestInit`

```typescript
const configProvider = new FetchConfigProvider(k => `http://localhost:4400/key/${k}`, () => {
  return {method: "GET"} as RequestInit;
})
```

## Example: Consul

```typescript
import {ConsulConfigProvider,IConsulConfiguration} from "rokot-config";

const config : IConsulConfiguration= {
  host: "localhost",
  port:4500
}

const configProvider = new ConsulConfigProvider(config)

configProvider.get<string>("key").then(value => {
  // value = <console provided value>
}).catch(err => {
  // 'key not found' or 'unable to connect to server'
})
```

You can modify the `fetch` via a `RequestInit`

```typescript
const configProvider = new ConsulConfigProvider(config, () => {
  return {method: "GET"} as RequestInit;
})
```

## Example: InProc

```typescript
import {InProcConfigProvider} from "rokot-config";

// Seed Provider with key value pairs
const configProvider = new InProcConfigProvider({"key":"value"})

// Add additional key/value
interface IUser{
  id: string;
  name: string;
}
const user: IUser = {
  id: "rkt",
  name: "rocketmaker"
}
configProvider.set("user", user);

configProvider.get<string>("key").then(value => {
  // value = "value"
}).catch(err => {
  // 'key not found' - catch not called in this case
})


configProvider.get<IUser>("user").then(value => {
  // value = 'user'
}).catch(err => {
  // 'key not found' - catch not called in this case
})

configProvider.get<IUser>("unknownKey").then(value => {
  // not called in this case
}).catch(err => {
  // 'key not found'
})
```

## Consumed Libraries

### [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
Provides `fetch` for both node and browser environments!

### DEV - [rokot-test](https://github.com/Rocketmakers/rokot-test)
The testing framework used within the Rokot Platform!
