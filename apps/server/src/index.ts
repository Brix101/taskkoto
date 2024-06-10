import { startServer } from "@/server";

startServer().then((server) => {
  //////////////////////////////////////////////////////////////////////
  const signals = ["SIGTERM", "SIGINT", "SIGHUP", "SIGBREAK"];
  const errorTypes = ["unhandledRejection", "uncaughtException"];

  errorTypes.forEach((type) => {
    process.on(type, async (error) => {
      try {
        console.error(`process exit due to ${type}`);
        console.error(error);
        process.exit(1);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signals.forEach((type) => {
    process.on(type, () => {
      console.log(`${type} signal received.`);
      console.log("Closing http server.");
      server.close((err) => {
        console.log("Http server closed.");
        process.exit(err ? 1 : 0);
      });
    });
  });
});
