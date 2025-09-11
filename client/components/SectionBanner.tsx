interface SectionBannerProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionBanner({ title, subtitle, className = "" }: SectionBannerProps) {
  return (
     <div className={`section-banner bg-gradient-to-r from-panasonic-blue/10 to-panasonic-blue/20 text-black py-5 rounded-t-lg flex items-start gap-4 ${className}`}>
       <div className="w-9 h-9 rounded-md bg-white/40 grid place-items-center flex-shrink-0">
         <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" aria-hidden>
           <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
         </svg>
       </div>
       <div className="space-y-1">
         <div className="text-2xl font-bold font-[Arial] leading-7">{title}</div>
         {subtitle ? (
           <div className="text-base md:text-lg text-black/70 font-[Arial]">{subtitle}</div>
         ) : null}
       </div>
     </div>
  );
}
