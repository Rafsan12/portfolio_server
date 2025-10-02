import http, { Server } from "http";
import app from "./app";

let server: Server;

// Start server
function startServer() {
  server = http.createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
  });
}

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("✅ HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Handle process events
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

// Run
startServer();
handleProcessEvents();
