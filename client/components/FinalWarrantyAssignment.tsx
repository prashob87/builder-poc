export default function FinalWarrantyAssignment({ className = "" }: { className?: string }) {
  return (
    <div className={`final-warranty--assignment bg-gradient-to-r from-panasonic-blue/10 to-panasonic-blue/20 text-black py-5 rounded-t-lg flex items-start gap-4 mb-0 ${className}`}>
      <div className="w-9 h-9 rounded-md bg-white/40 grid place-items-center flex-shrink-0">
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold font-[Arial] leading-7">Final Warranty Assignment</div>
        <div className="text-base md:text-lg text-black/70 font-[Arial]">Select a Warranty contract by clicking on <span className="font-bold">Assign to Customer</span></div>
      </div>
    </div>
  );
}
