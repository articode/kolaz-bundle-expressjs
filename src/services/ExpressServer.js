export class ExpressServer {
    constructor(express, log, params) {
        this.express = express;
        this.log = log;
        this.params = params;
    }

    start() {
        let port = this.params.has("server.port") ? this.params.get("server.port") : 3000;
        this.server = this.express.listen(port, () => {
            if (this.log) {
                this.log.debug(`Listening on port ${port}...`);
            }
        });

        return this.server;
    }
}