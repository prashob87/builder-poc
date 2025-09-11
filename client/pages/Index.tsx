import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Simple email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const showSpinner = email.length >= 2 && !isValidEmail(email);
  const showCheckmark = isValidEmail(email);
  const isEmailValid = isValidEmail(email);

  const passwordRules = [
    { pattern: /.{8,}/, label: "8+ characters" },
    { pattern: /[A-Z]/, label: "One uppercase letter" },
    { pattern: /[a-z]/, label: "One lowercase letter" },
    { pattern: /[0-9]/, label: "One number" },
  ];
  const isPasswordValid = passwordRules.every((r) => r.pattern.test(password));
  const canAttemptLogin = isEmailValid && password.length > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header activeTab="purchase" showUserActions cartBadgeCount={6} />

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-stretch px-[90px] py-7 gap-20">
        {/* Left Section - Welcome */}
        <div className="w-[500px] bg-panasonic-blue p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-2xl font-bold font-[Arial]">
                Aquarea Service+
              </h1>
              <h2 className="text-white text-5xl font-normal font-[Arial] leading-tight">
                Zapraszamy do sklepu z rozszerzoną gwarancją
              </h2>
            </div>
            <div className="text-white text-xl font-normal font-[Arial] leading-[28px] space-y-4">
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <h3 className="text-white text-xl font-bold font-[Arial] mb-3">Getting Started:</h3>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-panasonic-blue font-bold text-sm">1</span>
                  </div>
                  <p className="text-white">
                    <strong>Already a ProClub member?</strong><br />
                    Log in with your ProClub credentials below
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-panasonic-blue font-bold text-sm">2</span>
                  </div>
                  <p className="text-white">
                    <strong>New to ProClub?</strong><br />
                    Register as a new reseller first, then return to log in
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-panasonic-blue font-bold text-sm">3</span>
                  </div>
                  <p className="text-white">
                    <strong>After logging in:</strong><br />
                    Access products, manage customers, and initiate billing
                  </p>
                </div>
              </div>

              <p className="text-center text-lg italic opacity-90">
                This is a closed store for authorized resellers only
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-[500px]">
          <form className="flex flex-col justify-between" onSubmit={async (e) => {
            e.preventDefault();
            if (!canAttemptLogin || loading) return;
            setLoading(true);
            setAttemptedLogin(false);
            try {
              const resp = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              });

              if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                setAttemptedLogin(true);
                toast({
                  title: "Login failed",
                  description: typeof err?.error === "string" ? err.error : "Please check your credentials and try again.",
                  variant: "destructive",
                });
                return;
              }

              const data = await resp.json().catch(() => ({}));
              const token = (data && data.token) || "";
              if (token) {
                try { localStorage.setItem("auth_token", token); } catch {}
              }
              toast({ title: "Welcome", description: "Successfully signed in." });
              navigate("/assign-warranty");
            } catch (err) {
              toast({ title: "Network error", description: "Unable to reach the server.", variant: "destructive" });
            } finally {
              setLoading(false);
            }
          }}>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-8">
              <h1 className="text-black text-4xl font-bold font-[Arial]">Login</h1>
              <p className="text-black text-base font-normal font-[Arial] leading-6">
                Please login with your PRO Club credentials. In case of any difficulties, please use the link forgot password
              </p>
            </div>

            <div className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-black text-base font-normal font-[Arial] leading-6">
                Email Address
              </label>
              <div className="h-11 px-3 py-6 border border-black rounded bg-white flex items-center gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  className="flex-1 text-base text-black font-[Arial] outline-none bg-transparent placeholder:text-[#969C9F]"
                />
                {showSpinner && (
                  <div className="flex-shrink-0">
                    <svg
                      className="animate-spin h-5 w-5 text-panasonic-blue"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                )}
                {showCheckmark && (
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-black text-base font-normal font-[Arial] leading-6">
                Password
              </label>
              <div className={`h-11 px-3 py-6 border rounded bg-white flex items-center gap-3 ${attemptedLogin ? 'border-red-500' : 'border-black'}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 text-base text-black font-[Arial] outline-none bg-transparent"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex-shrink-0 text-panasonic-blue hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded p-1"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              {attemptedLogin && (
                <p className="text-xs text-red-600 font-[Arial]">Incorrect password. Please use Forgot Password to reset.</p>
              )}
              <p className="text-xs text-panasonic-text-gray font-[Arial]">
                If your ProClub password does not work, please click on the Forgot Password link
              </p>
            </div>
            
              {/* Forgot Login Link */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-panasonic-blue text-sm font-semibold underline underline-offset-2 font-[Arial] leading-6 hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-1"
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
          
          {/* Login Button and Register Link */}
          <div className="flex flex-col gap-1.5">
            <button
              type="submit"
              className={`w-full h-12 font-bold text-[17px] leading-[17px] rounded-lg border transition-all duration-200 ${
                canAttemptLogin
                  ? 'bg-[#F9CB3A] text-black border-transparent cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:border-[#F2F2F2] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset]'
                  : 'bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] border-transparent cursor-not-allowed'
              }`}
              disabled={!canAttemptLogin || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex gap-10">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/account-data')}
                  className="text-black text-xs underline font-[Arial] leading-6 hover:text-panasonic-blue transition-colors"
                >
                  Register as new Reseller
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
