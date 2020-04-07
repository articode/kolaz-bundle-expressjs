export class ExpressRouter {
    constructor(express, controllerResolver, log) {
        this.express = express;
        this.controllerResolver = controllerResolver;
        this.log = log;
    }

    registerRoute(route) {
        let { method, path, handler } = route;
        let middleware = [];

        if (typeof handler === 'function') {
            middleware.push(handler);
        }
        else {
            middleware.push((request, response, next) => {
                let requestHandler = this.controllerResolver.buildHandler(handler, {
                    request,
                    response
                });

                let args = [];

                let result = requestHandler(...args);

                Promise.resolve(result)
                .then((result) => {
                    if (!response.headersSent) {
                        response.send(result);
                        next();
                    }
                })
                .catch((error) => {
                    next(error);
                });
            });
        }

        this.express[method](path, ...middleware);
    }
}