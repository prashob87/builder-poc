import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";

interface CertState {
  model: string;
  serialNumber: string;
  warrantyId: string;
  startDate: string; // yyyy-mm-dd
  customerFirstName?: string;
  customerLastName?: string;
  customerStreet: string;
  customerZip: string;
  customerCity: string;
  installerCompanyName?: string;
}

export default function WarrantyCertificate() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: CertState };
  const data = location.state;
  const { count } = useCart();
  const assignCount = Math.max((count || 0) - 1, 0);

  useEffect(() => {
    if (!data) navigate("/assign-warranty-detail");
    // no deps: run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return null;

  const humanDate = (() => {
    const d = new Date(data.startDate);
    if (isNaN(d.getTime())) return data.startDate;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  })();

  const fullName = [data.customerFirstName, data.customerLastName].filter(Boolean).join(' ');
  const locationStr = [
    data.customerStreet,
    [data.customerZip, data.customerCity].filter(Boolean).join(' ')
  ].filter((s) => s && String(s).trim().length > 0).join(', ');
  const installerName = data.installerCompanyName || 'Installation Corp. Inc.';

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header showUserActions activeTab={"assign"} assignBadgeCount={assignCount} showCartBadge={false} />

      <main className="flex-1 px-4 md:px-8 lg:px-[90px] py-8">
        <div className="max-w-[1000px] mx-auto space-y-6">
          {/* Certificate Canvas */}
          <section
            id="certificate"
            className="relative bg-white border-4 border-gray-400 shadow-xl mx-auto max-w-[850px] print:shadow-none print:border-2 print:border-gray-600"
            style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)' }}
          >
            {/* Top bar */}
            <div className="flex justify-between items-center p-6">
              <div className="flex flex-col gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc2f2e8f867424bc498dd8cb3c4e3c96b%2F2608070f56184edbad42bd38dbf1521d?format=webp&width=800"
                  alt="Panasonic heating & cooling solutions"
                  className="h-6 w-auto"
                />
                <div className="text-black text-base font-[Arial] font-semibold">
                  {installerName}
                </div>
              </div>
              <div className="bg-[#77A6D7] text-white p-4 rounded-md min-w-[320px] flex items-center gap-3 justify-end">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 14l-2 7 6-3 6 3-2-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-right">
                  <div className="font-bold">Certificate of Extended Warranty</div>
                  <div className="text-sm">valid till: dd.mm.yyyy</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 p-6">
              {/* Left graphic */}
              <div className="col-span-1">
                <div className="bg-[#2B6AA0] text-white rounded-md p-6 h-[260px] flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-bold">5 lat(a)</div>
                  <div className="text-sm">Gwarancji na sprężarkę</div>
                  <div className="my-3 text-4xl">+</div>
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/80 grid place-items-center">
                      <span className="text-5xl font-bold leading-none">3</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">lat(a) Gwarancji na urządzenie</div>
                </div>
              </div>

              {/* Right details */}
              <div className="col-span-2">
                <div className="space-y-2">
                  <CertLine label="IMIĘ" value={data.customerFirstName || ''} />
                  <CertLine label="NAZWISKO" value={data.customerLastName || ''} />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <CertLine label="NUMER GWARANCJI" value={data.warrantyId} />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#2C3437] uppercase tracking-wide text-right">INSTALLER CODE</div>
                      <div className="h-9 border-b border-gray-300 flex items-end justify-end text-base text-black font-semibold">—</div>
                    </div>
                  </div>
                  <CertLine label="Lokalizacja / adres montażu urządzenia" value={locationStr} />
                  <CertLine label="Model" value={data.model} />
                  <CertLine label="Numer seryjny" value={data.serialNumber} />
                  <CertLine label="Data uruchomienia" value={humanDate} strong />
                </div>
              </div>
            </div>

            <div className="px-6 pb-8 text-[11px] text-black/70 space-y-2">
              <div className="mb-4">
                * Niniejszy dokument potwierdza objęcie gwarancją jakości urządzenia marki Panasonic na zasadach określonych w aktualnych warunkach gwarancji.
              </div>

              <div className="space-y-1 text-[10px] text-gray-500 leading-relaxed">
                <div>Gwarancja obejmuje naprawy i wymianę części zgodnie z warunkami technicznymi producenta.</div>
                <div>Świadczenia gwarancyjne realizowane są przez autoryzowanych partnerów serwisowych Panasonic.</div>
                <div>Niniejszy certyfikat należy przechowywać wraz z dokumentem zakupu urządzenia.</div>
                <div>Dodatkowe informacje o warunkach gwarancji dostępne są na stronie internetowej producenta.</div>
                <div>W przypadku pytań prosimy o kontakt z działem obsługi klienta pod numerem telefonu wskazanym w dokumentacji.</div>
              </div>
            </div>
            {/* Watermark and official seal */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rotate-[-20deg] text-[#2B6AA0]/5 text-8xl md:text-[140px] font-extrabold tracking-widest select-none">
                AQUAREA
              </div>
            </div>
            <div className="absolute right-6 bottom-6 print:right-4 print:bottom-4">
              <svg viewBox="0 0 240 160" className="w-56 h-36 drop-shadow-md" role="img" aria-label="Certified seal">
                <g fill="#2B6AA0" opacity="0.98">
                  <path d="M24 108 L108 108 L84 148 L24 124 Z"/>
                  <path d="M132 108 L216 108 L216 124 L156 148 Z"/>
                </g>
                <g transform="translate(120,80)" style={{textRendering:'geometricPrecision',shapeRendering:'geometricPrecision'}}>
                  <defs>
                    <path id="topArc" d="M -36 0 A 36 36 0 1 1 36 0" />
                    <path id="bottomArc" d="M 36 0 A 36 36 0 1 1 -36 0" />
                  </defs>
                  <circle r="56" fill="#2B6AA0"/>
                  <circle r="42" fill="#ffffff"/>
                  <circle r="48" fill="none" stroke="#2B6AA0" strokeWidth="6"/>
                  <path d="M-18 6 l10 10 l24 -28" fill="none" stroke="#2B6AA0" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle r="34" fill="none" stroke="#2B6AA0" strokeWidth="2"/>
                  <text fontSize="11" fontWeight="800" letterSpacing="3" fill="#2B6AA0">
                    <textPath href="#topArc" startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
                  </text>
                  <text fontSize="11" fontWeight="800" letterSpacing="3" fill="#2B6AA0">
                    <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
                  </text>
                  <circle cx="-26" cy="-6" r="3" fill="#2B6AA0"/>
                  <circle cx="26" cy="-6" r="3" fill="#2B6AA0"/>
                </g>
              </svg>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-panasonic-blue text-sm font-semibold underline underline-offset-2 font-[Arial] leading-6 hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-1"
              onClick={() => navigate(-1)}
            >
              <svg className="w-5 h-5" viewBox="0 0 25 25" fill="none">
                <path d="M12.6113 19.3406L5.61133 12.3406M5.61133 12.3406L12.6113 5.34058M5.61133 12.3406H19.6113" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-[Arial]">Cancel</span>
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="h-12 px-8 font-bold text-[17px] leading-[17px] rounded-lg transition-all duration-200 bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                onClick={() => window.print()}
              >
                Download / Print
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Print styles */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 12mm; }
          header, footer, nav, .print\:hidden { display: none !important; }
          main { padding: 0 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

function CertLine({ label, value, strong }: { label: string; value: string; strong?: boolean; }) {
  return (
    <div className="py-1">
      <div className="text-[11px] text-[#2C3437] uppercase tracking-wide">{label}</div>
      <div className={`h-9 border-b border-gray-300 flex items-end text-base ${strong ? 'font-bold' : 'font-semibold'} text-black`}>
        {value || '\u00A0'}
      </div>
    </div>
  );
}

function CertRow({ label, value, rightLabel, rightValue }: { label: string; value: string; rightLabel?: string; rightValue?: string; }) {
  return (
    <div className="py-3 grid grid-cols-3 items-start gap-4">
      <div className="col-span-2">
        <div className="text-[11px] text-[#2C3437] uppercase tracking-wide">{label}</div>
        <div className="text-base text-black font-semibold">{value}</div>
      </div>
      {rightLabel && (
        <div className="text-right">
          <div className="text-[11px] text-[#2C3437] uppercase tracking-wide">{rightLabel}</div>
          <div className="text-base text-black font-semibold">{rightValue}</div>
        </div>
      )}
    </div>
  );
}
