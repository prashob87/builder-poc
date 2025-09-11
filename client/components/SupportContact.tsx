import React from "react";

type Size = "sm" | "md" | "lg";

interface SupportContactProps {
  phone?: string;
  className?: string;
  size?: Size;
}

const SIZE_MAP: Record<Size, { wrapper: string; img: string }> = {
  sm: { wrapper: "w-12 h-12", img: "w-10 h-10" },
  md: { wrapper: "w-16 h-16", img: "w-14 h-14" },
  lg: { wrapper: "w-20 h-20", img: "w-16 h-16" },
};

export default function SupportContact({
  phone = "+49 12334 123124",
  className = "",
  size = "lg",
}: SupportContactProps) {
  const sizes = SIZE_MAP[size];
  return (
    <div className={`flex items-center gap-8 mb-12 ${className}`}>
      <div className={`rounded-full bg-[#FFF5F5] flex items-center justify-center support--badge ${sizes.wrapper}`}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fc2f2e8f867424bc498dd8cb3c4e3c96b%2Fa6f535894b1a43f696d42c817bb31cfe?format=webp&width=160"
          alt="Support agent"
          width={64}
          height={64}
          loading="lazy"
          className={`${sizes.img} rounded-full object-cover`}
        />
      </div>
      <div>
        <div className="text-black text-base font-['Arial'] mb-2">Questions? Give us a call!</div>
        <div className="border-b-2 border-black inline-block">
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-black text-base font-['Arial'] font-bold">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
