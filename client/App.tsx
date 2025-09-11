import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AccountData from "./pages/AccountData";
import PDP from "./pages/PDP";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import AssignWarranty from "./pages/AssignWarranty";
import AssignWarrantyDetail from "./pages/AssignWarrantyDetail";
import OrderHistory from "./pages/OrderHistory";
import WarrantyCertificate from "./pages/WarrantyCertificate";
import NotFound from "./pages/NotFound";
import HeaderOnly from "./pages/HeaderOnly";
import ForgotPassword from "./pages/ForgotPassword";
import StripePayment from "./pages/StripePayment";
import EmailPasswordReset from "./pages/EmailPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import { CartProvider } from "./hooks/use-cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account-data" element={<AccountData />} />
            <Route path="/pdp" element={<PDP />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/stripe-payment" element={<StripePayment />} />
            <Route path="/assign-warranty" element={<AssignWarranty />} />
            <Route path="/assign-warranty-detail" element={<AssignWarrantyDetail />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/warranty-certificate" element={<WarrantyCertificate />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-password-reset" element={<EmailPasswordReset />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/header" element={<HeaderOnly />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
