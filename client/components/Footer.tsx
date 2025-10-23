import React from "react";

export default function Footer() {
  return (
    <footer className="bg-panasonic-gray border-t border-[rgba(0,0,0,0.06)]">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6 lg:px-0 py-6">
        <div className="flex flex-col gap-4 text-panasonic-text-gray">
          {/* Top links: social */}
          <nav aria-label="Social links" className="flex flex-wrap items-center gap-4 sm:gap-6">
            {[
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
              { label: "Youtube", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-xs sm:text-[13px] hover:underline focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-0.5">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Corporate links */}
          <nav aria-label="Corporate links" className="flex flex-wrap items-center gap-2 text-xs">
            {[
              "About us",
              "Contact us",
              "Sitemap",
              "Terms of Use",
              "Privacy Policy",
              "Cookies Policy",
              "Anti-Bribery",
              "News",
              "Energy Labels",
              "Data act",
            ].map((label, i, arr) => (
              <React.Fragment key={label}>
                <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-0.5">
                  {label}
                </a>
                {i < arr.length - 1 && <span className="w-px h-4 bg-panasonic-text-gray/60 inline-block align-middle" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </nav>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-[13px]">Payment Methods</span>
            <span className="w-px h-4 bg-panasonic-text-gray/60" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* PayPal */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-5 object-contain"
                loading="lazy"
              />
              {/* Visa */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-5 object-contain"
                loading="lazy"
              />
              {/* Mastercard */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-5 object-contain"
                loading="lazy"
              />
              {/* ID Check badge */}
              <span className="px-2 py-0.5 border border-panasonic-text-gray/50 text-[11px] rounded">ID Check</span>
              {/* Klarna */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc2f2e8f867424bc498dd8cb3c4e3c96b%2F51ea9325f9b347d3a143e872f0be87ac?format=webp&width=800"
                alt="Klarna"
                className="h-5 rounded object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-[11px] leading-5">
            Copyright © 2024 Panasonic Marketing Europe GmbH All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
