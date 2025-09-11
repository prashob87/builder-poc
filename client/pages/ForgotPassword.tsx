import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const emailValid = isValidEmail(email);
  const passwordRules = [
    { pattern: /.{8,}/, label: "8+ characters" },
    { pattern: /[A-Z]/, label: "One uppercase letter" },
    { pattern: /[a-z]/, label: "One lowercase letter" },
    { pattern: /[0-9]/, label: "One number" },
    { pattern: /[^A-Za-z0-9]/, label: "One special character" },
  ];
  const passwordValid = passwordRules.every((r) => r.pattern.test(password));

  const onSubmit = async () => {
    if (!emailValid || submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 300));
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    const token = Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
    const params = new URLSearchParams({ email, token });
    setSubmitting(false);
    navigate(`/email-password-reset?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header activeTab="purchase" showUserActions cartBadgeCount={6} />

      <main className="flex-1 flex justify-center items-stretch px-[90px] py-7 gap-20">
        {/* Left Section - Welcome (reusing login aesthetics) */}
        <div className="w-[500px] bg-panasonic-blue p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-2xl font-bold font-[Arial]">Aquarea Service+</h1>
              <h2 className="text-white text-5xl font-normal font-[Arial] leading-tight">Reset your password</h2>
            </div>
            <p className="text-white text-xl font-normal font-[Arial] leading-[28px]">
              Enter your email and choose a new password for your account.
            </p>
          </div>
        </div>

        {/* Right Section - Forgot Password Form */}
        <div className="w-[500px]">
          <form className="flex flex-col justify-between" onSubmit={(e) => { e.preventDefault(); if (!emailValid || submitting) return; onSubmit(); }}>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-8">
              <h1 className="text-black text-4xl font-bold font-[Arial]">Forgot Password</h1>
              <p className="text-black text-base font-normal font-[Arial] leading-6">
                Please select a new password for your purchase. Your PROClub password will not be changed.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-black text-base font-normal font-[Arial] leading-6">Email Address</label>
                <div className={`h-11 px-3 py-6 border rounded bg-white flex items-center gap-3 ${email ? (emailValid ? 'border-green-500' : 'border-red-500') : 'border-black'}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@domain.com"
                    className="flex-1 text-base text-black font-[Arial] outline-none bg-transparent placeholder:text-[#969C9F]"
                  />
                  {email && (
                    emailValid ? (
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="animate-spin h-5 w-5 text-panasonic-blue" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )
                  )}
                </div>
              </div>


              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={!emailValid || submitting}
                  className={`w-full h-12 font-bold text-[17px] leading-[17px] rounded-lg transition-all duration-200 ${
                    emailValid && !submitting ? 'bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]' : 'bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] cursor-not-allowed'}`}
                >
                  {submitting ? 'Updating…' : 'Reset password'}
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-panasonic-blue text-sm font-semibold underline underline-offset-2 font-[Arial] leading-6 self-end hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-1"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
