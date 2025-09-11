import type { RequestHandler } from "express";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  // We intentionally avoid throwing here to keep the server bootable without secrets.
  // Handlers below will respond with 500 if the key is missing.
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export const createEmbeddedCheckoutSession: RequestHandler = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured. Set STRIPE_SECRET_KEY." });
    }

    const origin = (req.get("origin") || req.get("referer") || "").replace(/\/$/, "");
    if (!origin) {
      return res.status(400).json({ error: "Missing request origin header" });
    }

    const body = req.body as {
      items: { name: string; amount: number; currency: string; quantity?: number }[];
    };

    if (!body?.items?.length) {
      return res.status(400).json({ error: "Missing items in request body" });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items.map((it) => ({
      quantity: typeof it.quantity === "number" && it.quantity > 0 ? it.quantity : 1,
      price_data: {
        currency: it.currency,
        product_data: { name: it.name },
        unit_amount: Math.round(it.amount * 100),
      },
    }));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items,
      return_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      // Enable shipping collection if you need it:
      // shipping_address_collection: { allowed_countries: ["US", "CA"] },
      // automatic_tax: { enabled: true },
    });

    return res.status(200).json({ client_secret: session.client_secret });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Failed to create checkout session" });
  }
};

export const getSessionStatus: RequestHandler = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured. Set STRIPE_SECRET_KEY." });
    }

    const sessionId = req.query.session_id as string | undefined;
    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).json({ status: session.status, customer_email: session.customer_details?.email ?? null });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Failed to retrieve session status" });
  }
};
