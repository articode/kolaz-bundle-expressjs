import cors from "cors";
import express from "express";
import { QueryNormalizer } from "../middleware/QueryNormalizer";

export function ExpressApp(params) {
    let app = express();

    if (params.has("express.middleware.cors") && params.get("express.middleware.cors")) {
        app.use(cors());
    }
    if (params.has("express.middleware.json") && params.get("express.middleware.json")) {
        app.use(express.json());
    }
    if (params.has("express.middleware.queryNormalizer") && params.get("express.middleware.queryNormalizer")) {
        app.use(QueryNormalizer);
    }

    return app;
}