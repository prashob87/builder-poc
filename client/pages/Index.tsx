import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import "../styles/auth.css";

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
    <div className="auth-page">
      <Header activeTab="purchase" showUserActions cartBadgeCount={6} />

      {/* Main Content */}
      <main className="auth-main">
        {/* Left Section - Welcome */}
        <div className="auth-panel">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="auth-panel-title">Aquarea Service+</h1>
              <h2 className="auth-panel-subtitle">
                Zapraszamy do sklepu z rozszerzoną gwarancją
              </h2>
            </div>
            <div className="auth-getting-started">
              <div className="auth-getting-started-card">
                <h3 className="auth-getting-started-title">Getting Started:</h3>

                <div className="auth-step">
                  <div className="auth-step-bullet">
                    <span className="auth-step-bullet-text">1</span>
                  </div>
                  <p className="auth-step-text">
                    <strong>Already a ProClub member?</strong>
                    <br />
                    Log in with your ProClub credentials below
                  </p>
                </div>

                <div className="auth-step">
                  <div className="auth-step-bullet">
                    <span className="auth-step-bullet-text">2</span>
                  </div>
                  <p className="auth-step-text">
                    <strong>New to ProClub?</strong>
                    <br />
                    Register as a new reseller first, then return to log in
                  </p>
                </div>

                <div className="auth-step">
                  <div className="auth-step-bullet">
                    <span className="auth-step-bullet-text">3</span>
                  </div>
                  <p className="auth-step-text">
                    <strong>After logging in:</strong>
                    <br />
                    Access products, manage customers, and initiate billing
                  </p>
                </div>
              </div>

              <p className="auth-disclaimer">
                This is a closed store for authorized resellers only
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="auth-form-wrapper">
          <form
            className="auth-form"
            onSubmit={async (e) => {
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
                    description:
                      typeof err?.error === "string"
                        ? err.error
                        : "Please check your credentials and try again.",
                    variant: "destructive",
                  });
                  return;
                }

                const data = await resp.json().catch(() => ({}));
                const token = (data && data.token) || "";
                if (token) {
                  try {
                    localStorage.setItem("auth_token", token);
                  } catch {}
                }
                toast({
                  title: "Welcome",
                  description: "Successfully signed in.",
                });
                navigate("/assign-warranty");
              } catch (err) {
                toast({
                  title: "Network error",
                  description: "Unable to reach the server.",
                  variant: "destructive",
                });
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="auth-section">
              <div className="auth-header">
                <h1 className="auth-form-title">Login</h1>
                <p className="auth-form-subtitle">
                  Please login with your PRO Club credentials. In case of any
                  difficulties, please use the link forgot password
                </p>
              </div>

              <div className="form-fields">
                {/* Email Input */}
                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@domain.com"
                      className="text-input placeholder:text-[#969C9F]"
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
                <div className="form-field">
                  <label className="form-label">Password</label>
                  <div
                    className={`${attemptedLogin ? "input-wrapper-error" : "input-wrapper"}`}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="text-input"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                      className="password-toggle"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 3l18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {attemptedLogin && (
                    <p className="helper-error">
                      Incorrect password. Please use Forgot Password to reset.
                    </p>
                  )}
                  <p className="helper-muted">
                    If your ProClub password does not work, please click on the
                    Forgot Password link
                  </p>
                </div>

                {/* Forgot Login Link */}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="link-blue"
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
                className={
                  canAttemptLogin ? "login-button" : "login-button-disabled"
                }
                disabled={!canAttemptLogin || loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="login-links">
                <div className="spacer-grow"></div>
                <div className="right-justified">
                  <button
                    type="button"
                    onClick={() => navigate("/account-data")}
                    className="register-link"
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
