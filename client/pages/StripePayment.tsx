import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CreateSessionItem {
  name: string;
  amount: number; // major units e.g., 12.34 USD
  currency: string; // e.g., "usd"
  quantity?: number;
}

export default function StripePayment() {
  const location = useLocation();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
  const stripePromise = useMemo(() => (publishableKey ? loadStripe(publishableKey) : null), [publishableKey]);

  const [amount, setAmount] = useState<string>("20.00");
  const [currency, setCurrency] = useState<string>("usd");
  const [name, setName] = useState<string>("Order");
  const [quantity, setQuantity] = useState<string>("1");

  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/stripe/session-status?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (res.ok) {
          setSessionStatus(data.status ?? null);
          setCustomerEmail(data.customer_email ?? null);
        } else {
          setError(typeof data?.error === "string" ? data.error : "Unable to fetch session status");
        }
      } catch (e: any) {
        setError(e?.message || "Unable to fetch session status");
      }
    };
    fetchStatus();
  }, [sessionId]);

  const [checkoutItems, setCheckoutItems] = useState<CreateSessionItem[] | null>(null);

  useEffect(() => {
    // If items are passed from the previous page, use them directly
    const state = location.state as { items?: CreateSessionItem[] } | null;
    if (state?.items && Array.isArray(state.items) && state.items.length > 0) {
      setCheckoutItems(state.items);
    }
  }, [location.state]);

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const amt = Number.parseFloat(amount);
    const qty = Number.parseInt(quantity, 10);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError("Enter a valid amount greater than 0");
      return;
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      setError("Enter a valid quantity greater than 0");
      return;
    }
    setCheckoutItems([
      {
        name: name.trim() || "Order",
        amount: amt,
        currency: (currency || "usd").toLowerCase(),
        quantity: qty,
      },
    ]);
  };

  const fetchClientSecret = async () => {
    if (!checkoutItems) throw new Error("Missing checkout items");
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: checkoutItems }),
    });
    const data = await res.json();
    if (!res.ok || !data?.client_secret) {
      throw new Error(typeof data?.error === "string" ? data.error : "Failed to create checkout session");
    }
    return data.client_secret as string;
  };

  if (sessionId) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment result</CardTitle>
            <CardDescription>Session: {sessionId}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!error && (
              <div className="space-y-2">
                <p>Status: <span className="font-medium">{sessionStatus ?? "loading..."}</span></p>
                {customerEmail && <p>Receipt will be sent to: {customerEmail}</p>}
                <Button className="mt-4" onClick={() => (window.location.href = "/stripe-payment")}>New payment</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Stripe payment</CardTitle>
          <CardDescription>Start an embedded checkout</CardDescription>
        </CardHeader>
        <CardContent>
          {!publishableKey && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Stripe not configured</AlertTitle>
              <AlertDescription>
                Set VITE_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY environment variables to enable payments.
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!checkoutItems && (
            <form className="grid gap-4" onSubmit={handleStartCheckout}>
              <div className="grid gap-2">
                <Label htmlFor="name">Item name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={!publishableKey}>Proceed to checkout</Button>
              </div>
            </form>
          )}

          {checkoutItems && publishableKey && stripePromise && (
            <div className="mt-4">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <div id="checkout">
                  <EmbeddedCheckout />
                </div>
              </EmbeddedCheckoutProvider>
              <div className="mt-4">
                <Button variant="secondary" onClick={() => setCheckoutItems(null)}>Back</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
