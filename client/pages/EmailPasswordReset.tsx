import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmailPasswordReset() {
  const [params] = useSearchParams();
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const { resetUrl, sentAt } = useMemo(() => {
    const origin = window.location.origin;
    const usp = new URLSearchParams({ token, email });
    const url = `${origin}/reset-password?${usp.toString()}`;
    const date = new Date();
    const nice = date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return { resetUrl: url, sentAt: nice };
  }, [email, token]);

  return (
    <div className="h-screen bg-[#F5F5F5] flex flex-col">
      {/* Gmail-like header */}
      <div className="h-14 bg-white border-b flex items-center gap-3 px-3 sm:px-4">
        {/* Left */}
        <button aria-label="Main menu" className="p-2 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
        <div className="flex items-center gap-2 select-none">
          <div className="w-7 h-7 rounded bg-red-500 grid place-items-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M2 7l10 7 10-7v10H2V7Z" fill="currentColor"/></svg>
          </div>
          <span className="text-xl font-medium tracking-tight">Gmail</span>
        </div>
        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[720px] bg-[#F1F3F4] rounded-full flex items-center px-4 py-2 gap-3">
            <svg className="w-5 h-5 text-[#5f6368]" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Search mail" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Help"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 17v.01M12 13a4 4 0 1 0-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></button>
          <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Settings"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.6"/><path d="M19.4 15a7.96 7.96 0 0 0 .1-6l2-1.1-2-3.4-2.3.8a8.02 8.02 0 0 0-4.2-2.4L12 1 9.9 1.9a8.02 8.02 0 0 0-4.2 2.4l-2.3-.8-2 3.4 2 1.1a7.96 7.96 0 0 0 .1 6l-2 1.1 2 3.4 2.3-.8a8.02 8.02 0 0 0 4.2 2.4L12 23l2.1-.9a8.02 8.02 0 0 0 4.2-2.4l2.3.8 2-3.4-2-1.1Z" stroke="currentColor" strokeWidth="1.2"/></svg></button>
          <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Apps"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 5h4v4H5V5Zm0 10h4v4H5v-4Zm10-10h4v4h-4V5Zm0 10h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.6"/></svg></button>
          <div className="ml-1 w-8 h-8 rounded-full bg-[#4285F4] text-white grid place-items-center text-sm font-medium">ML</div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 min-h-0 px-3 sm:px-4 py-4">
        <div className="h-full border rounded-lg overflow-hidden shadow-sm grid grid-cols-[260px_1fr] bg-white">
          {/* Sidebar */}
          <aside className="bg-[#F7F7F7] border-r p-4 space-y-6 overflow-auto min-h-0">
            <div>
              <div className="text-xs uppercase text-[#666] mb-2">Folders</div>
              <nav className="space-y-1 text-sm">
                <a className="flex items-center justify-between rounded-md px-3 py-2 bg-white border">
                  <span>Inbox</span>
                  <span className="text-xs bg-[#224BFF] text-white rounded-full px-2">1</span>
                </a>
                <a className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white">Starred</a>
                <a className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white">Sent</a>
                <a className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white">Drafts</a>
                <a className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white">Trash</a>
              </nav>
            </div>

            <div>
              <div className="text-xs uppercase text-[#666] mb-2">Recent</div>
              <div className="space-y-1 text-sm">
                <div className="rounded-md px-3 py-2 hover:bg-white cursor-pointer">Promotion: Winter sale</div>
                <div className="rounded-md px-3 py-2 hover:bg-white cursor-pointer">Invoice October</div>
                <div className="rounded-md px-3 py-2 bg-white border cursor-default">Password reset request</div>
              </div>
            </div>
          </aside>

          {/* Message pane */}
          <section className="bg-white flex flex-col min-h-0">
            {/* Message header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-black">Reset your password</h2>
                <div className="text-xs text-[#666]">From: Aquarea Service+ &lt;noreply@aquarea.example&gt; • To: {email || "you"} • {sentAt}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded border" aria-label="Archive">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M4 7h16v13H4V7Zm2-4h12l2 4H4l2-4Z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
                <button className="px-3 py-2 rounded border" aria-label="Delete">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M6 7h12m-9 3v7m6-7v7M9 7l1-2h4l1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Message body */}
            <div className="flex-1 overflow-auto p-6 space-y-4 text-black leading-7">
              <p>Hello{email ? ` ${email}` : ""},</p>
              <p>We received a request to reset your password. Click the button below to choose a new one. This link will expire in 30 minutes.</p>
              <div className="mt-4">
                <a href={resetUrl} className="inline-block">
                  <Button className="bg-[#224BFF] text-white">Reset Password</Button>
                </a>
              </div>
              <p className="text-sm text-[#616161]">If you didn’t request a password reset, you can safely ignore this email.</p>
              <hr className="my-4" />
              <div className="text-xs text-[#9A9A9A] break-all">Reset link: {resetUrl}</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
