import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";
import logger from "./config/loggerconfig";
import { openDBConnection } from "./config/dbconfig";
import { ENV_VAR_UNDFINED } from "./utils/helper";
import {
  SERVER_TIMEOUT,
  PORT_TEXT,
  SERVER_FILE_LIMIT,
  SERVER_PARAMETER_LIMIT,
  SERVER_ALLOWED_METHODS,
  SERVER_EXPOSED_HEADERS,
} from "./constants/app";

dotenv.config();

const app = express();
const port = process.env.PORT;
openDBConnection();

if (!port) throw new Error(ENV_VAR_UNDFINED(PORT_TEXT));

app.set(PORT_TEXT, port);
app.use(
  cors({
    allowedHeaders: "*",
    exposedHeaders: SERVER_EXPOSED_HEADERS,
    origin: "*",
    methods: SERVER_ALLOWED_METHODS,
    preflightContinue: false,
  })
);
app.use(express.json({ limit: SERVER_FILE_LIMIT }));
app.use(
  express.urlencoded({
    limit: SERVER_FILE_LIMIT,
    extended: true,
    parameterLimit: SERVER_PARAMETER_LIMIT,
  })
);

app.use("/api", router);

// Start the server and listen on the preconfigured port
const server = app.listen(port, async () => {
  logger.info(`App started on port ${port}.`);
});
server.timeout = SERVER_TIMEOUT;
