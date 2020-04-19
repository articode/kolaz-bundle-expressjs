# ExpressJS Bundle

The ExpressJS bundle allows you to build Kolaz apps on top of ExpressJS framework.
It provides the essential `router` service for your app, as well as some useful middleware for the ExpressJS app.

### Services

Once registered, the ExpressJS bundle will add the following services to your Kolaz app.

#### "server"

Provided `server` service is a simple wrapper around `express.listen()` method.
It is used to start up the server by calling the `start()` method once your app is fully initialized.
For example:

```javascript 1.6
app.container.get("server").start();
```
By default, the server will try to listen on port 3000 (see configuration to change this setting).
If selected port is not available, it will listen on the first available port greater than 3000.

#### "router"

The `router` service generates a middleware to be used as a route handler.
If the route handler is defined as a Controller Action, the generated middleware wraps the Controller Action and handles the returned Response object.

#### "express"

An instance of ExpressJS app is exposed as `express` service.
You can use this "service" to add any middleware to your ExpressJS app.

### Middleware

ExpressJS Bundle comes with some commonly used middleware.
You can enable these individually from your configuration.
See configuration for more details on how to enable them.

#### "cors"

Setting `express.middleware.cors` parameter to `true` will add the `cors()` middleware to your express app.

#### "json"

If you want to parse JSON payloads automatically, set `express.middleware.json` parameter to `true`.

#### "queryNormalizer"

RESTful APIs often provide filtering capabilities when retrieving resource collections.
QueryNormalizer middleware normalizes request query parameters as objects containing operations and filter values.
 
For example, the following query: `/?param1=a&param2[in]=x,y,z&param3[gt]=10&param3[lt]=20` will be normalized to:
```
{
    param1: {
        eq: "a"
    },
    param2: {
        in: ["x", "y", "z"]
    },
    param3: {
        gt: 10,
        lt: 20
    }
}
``` 

To enable query normalizer, set `express.middleware.queryNormalizer` parameter to `true`

## Prerequisites

This version of ExpressJS Bundle requires Kolaz v0.2.0.

## Installation

### Step 1: Download

```shell script
npm install kolaz-bundle-expressjs
```

### Step 2: Enable

```ecmascript 6
import { ExpressJsBundle } from "kolaz-bundle-expressjs";
import { Kernel } from "kolaz/Component/Kernel";

export class App extends Kernel {
    registerBundles() {
        return [
            // ...
            new ExpressJsBundle()
            // ...
        ];
    }
}
```

### Step 3: Configure

Given example uses `config` npm module (recommended) as the parameter bag service.
If you use the default `kolaz/Component/ParameterBag` or a simple javascript `Map`, you might need to flatten the configuration object. 

```json5
{
    // ...
    "server": {
        "port": 3000
    },
    "express": {
        "middleware": {
            "cors": false,
            "json": false,
            "queryNormalizer": false
        }
    }
    // ...
}
```