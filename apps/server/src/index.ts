import express from 'express';
import { buildApp } from './app.js';
import { log } from './lib/logger.js';

const app = express();

const port = process.env.PORT || 5000;

const endpoint = await buildApp(app);

const server = app.listen(port, () => {
  log.info(`server started on http://localhost:${port}${endpoint}`);
});

//////////////////////////////////////////////////////////////////////
const signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGBREAK'];
const errorTypes = ['unhandledRejection', 'uncaughtException'];

errorTypes.forEach((type) => {
  process.on(type, async (error) => {
    try {
      log.error(`process exit due to ${type}`);
      log.error(error);
      process.exit(1);
    } catch (_) {
      process.exit(1);
    }
  });
});

signals.forEach((type) => {
  process.on(type, () => {
    log.info(`${type} signal received.`);
    log.info('Closing http server.');
    server.close((err: unknown) => {
      log.info('Http server closed.');
      process.exit(err ? 1 : 0);
    });
  });
});
