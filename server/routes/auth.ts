import type { RequestHandler } from "express";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginHandler: RequestHandler = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parsed.error.flatten(),
    });
  }

  const { email, password } = parsed.data;
  const endpoint = process.env.AUTH_LOGIN_URL;

  // If configured, forward credentials to external auth service
  if (endpoint) {
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await resp.text();
      let data: unknown;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (!resp.ok) {
        return res.status(resp.status).json({
          error: "Authentication failed",
          details: data,
        });
      }

      return res.status(200).json(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return res.status(502).json({ error: "Auth service unreachable", details: message });
    }
  }

  // Development fallback (optional): allow any credentials when explicitly enabled
  if (process.env.DEV_AUTH_ALLOW_ANY === "true") {
    return res.json({ token: "dev-token", user: { email } });
  }

  return res.status(501).json({ error: "AUTH_LOGIN_URL not configured" });
};
