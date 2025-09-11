import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const token = params.get("token") || "";
  const { toast } = useToast();
  const navigate = useNavigate();

  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const valid = useMemo(() => {
    const rules = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
    return rules.every((r) => r.test(pwd));
  }, [pwd]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !valid) return;
    toast({ title: "Password updated", description: `Password reset for ${email || "your account"}.` });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header activeTab="purchase" showUserActions cartBadgeCount={0} />

      <main className="flex-1 flex justify-center items-stretch px-[90px] py-7 gap-20">
        {/* Left Panel (consistent UI) */}
        <div className="w-[500px] bg-panasonic-blue p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-2xl font-bold font-[Arial]">Aquarea Service+</h1>
              <h2 className="text-white text-5xl font-normal font-[Arial] leading-tight">Reset your password</h2>
            </div>
            <p className="text-white text-xl font-normal font-[Arial] leading-[28px]">
              Enter a strong new password for your account. You'll use this the next time you log in.
            </p>
          </div>
        </div>

        {/* Right Section - Reset Form */}
        <div className="w-[500px]">
          <form className="flex flex-col justify-between" onSubmit={onSubmit}>
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-8">
                <h1 className="text-black text-4xl font-bold font-[Arial]">Choose a new password</h1>
                <p className="text-black text-base font-normal font-[Arial] leading-6">
                  Resetting for: <span className="font-semibold">{email || "your account"}</span>
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-black text-base font-normal font-[Arial] leading-6">New Password</label>
                  <div className="h-11 px-3 py-6 border border-gray-400 rounded bg-white flex items-center gap-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
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
                  <div className="mt-2 rounded-lg border-2 border-[#F9CB3A] bg-transparent p-3">
                    <div className="text-sm font-bold text-black mb-1 font-[Arial]">Password requirements</div>
                    <ul className="text-sm font-[Arial] space-y-1">
                      <li className={/.{8,}/.test(pwd) ? 'text-green-700' : 'text-black'}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/.{8,}/.test(pwd) ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                        8+ characters
                      </li>
                      <li className={/[A-Z]/.test(pwd) ? 'text-green-700' : 'text-black'}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(pwd) ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                        One uppercase letter
                      </li>
                      <li className={/[a-z]/.test(pwd) ? 'text-green-700' : 'text-black'}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(pwd) ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                        One lowercase letter
                      </li>
                      <li className={/[0-9]/.test(pwd) ? 'text-green-700' : 'text-black'}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(pwd) ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                        One number
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(pwd) ? 'text-green-700' : 'text-black'}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(pwd) ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={!valid || !token}
                    className={`w-full h-12 font-bold text-[17px] leading-[17px] rounded-lg transition-all duration-200 ${
                      valid && token ? 'bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]' : 'bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] cursor-not-allowed'}`}
                  >
                    Update password
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
