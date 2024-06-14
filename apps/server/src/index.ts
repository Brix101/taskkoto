import express from "express";
import { buildApp } from "./app.js";
import { logger } from "./lib/logger.js";

const app = express();

const port = process.env.PORT || 5000;

const endpoint = await buildApp(app);

const server = app.listen(port, () => {
  logger.info(`server started on http://localhost:${port}${endpoint}`);
});

//////////////////////////////////////////////////////////////////////
const signals = ["SIGTERM", "SIGINT", "SIGHUP", "SIGBREAK"];
const errorTypes = ["unhandledRejection", "uncaughtException"];

errorTypes.forEach((type) => {
  process.on(type, async (error) => {
    try {
      logger.error(`process exit due to ${type}`);
      logger.error(error);
      process.exit(1);
    } catch (_) {
      process.exit(1);
    }
  });
});

signals.forEach((type) => {
  process.on(type, () => {
    logger.info(`${type} signal received.`);
    logger.info("Closing http server.");
    server.close((err: unknown) => {
      logger.info("Http server closed.");
      process.exit(err ? 1 : 0);
    });
  });
});
