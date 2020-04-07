export class ExpressServer {
    constructor(express, log, params) {
        this.express = express;
        this.log = log;
        this.params = params;
    }

    start() {
        let port = this.params.get("server.port");
        this.server = this.express.listen(port, () => {
            this.log.info(`Listening on port ${port}...`);
        });
    }
}