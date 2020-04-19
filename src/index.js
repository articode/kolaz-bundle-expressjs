import { Bundle } from "kolaz/Component/Bundle";
import { ExpressApp } from "./services/ExpressApp";
import { ExpressRouter } from "./services/ExpressRouter";
import { ExpressServer } from "./services/ExpressServer";

export class ExpressJsBundle extends Bundle {
    configureContainer(container) {
        container.add("express", ExpressApp, ["params"]);
        container.add("server", ExpressServer, ["express", "log", "params"]);
        container.add("router", ExpressRouter, ["express", "controller", "log", "params"]);
    }
}