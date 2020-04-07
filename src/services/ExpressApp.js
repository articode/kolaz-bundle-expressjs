import cors from "cors";
import express from "express";
import { QueryNormalizer } from "../middleware/QueryNormalizer";

export function ExpressApp(params) {
    let app = express();

    if (params.get("express.middleware.cors")) {
        app.use(cors());
    }
    if (params.get("express.middleware.json")) {
        app.use(express.json());
    }
    if (params.get("express.middleware.queryNormalizer")) {
        app.use(QueryNormalizer);
    }
    
    return app;
}