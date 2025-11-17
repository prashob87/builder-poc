import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createEmbeddedCheckoutSession, getSessionStatus } from "./routes/stripe";
import { loginHandler } from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/login", loginHandler);

  // Stripe Embedded Checkout endpoints
  app.post("/api/stripe/create-checkout-session", createEmbeddedCheckoutSession);
  app.get("/api/stripe/session-status", getSessionStatus);

  return app;
}
