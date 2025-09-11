import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SupportContact from "@/components/SupportContact";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/hooks/use-cart";

export default function PDP() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { addItem, count } = useCart();

  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
  const planPrices = useMemo(() => ({
    "1-year": 109,
    "2-year": 99.99,
    "3-year": 98.99,
  }), []);
  const selectedPrice = selectedPlan ? planPrices[selectedPlan as keyof typeof planPrices] : null;
  const totalLabel = selectedPrice ? `Add to Cart - ${selectedPrice.toFixed(2)} zł / year` : "Add to Cart";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showUserActions={true} activeTab="purchase" assignBadgeCount={0} />

      {/* Main Content */}
      <main className="flex-1 px-[90px] py-7 w-full max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-28">
          <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
            <path d="M15.6035 21.3401V13.3401C15.6035 13.0748 15.4982 12.8205 15.3106 12.6329C15.1231 12.4454 14.8687 12.3401 14.6035 12.3401H10.6035C10.3383 12.3401 10.0839 12.4454 9.89641 12.6329C9.70887 12.8205 9.60352 13.0748 9.60352 13.3401V21.3401M3.60352 10.3401C3.60345 10.0491 3.66685 9.76168 3.7893 9.49777C3.91176 9.23387 4.09031 8.99985 4.31252 8.81206L11.3125 2.81306C11.6735 2.50796 12.1309 2.34058 12.6035 2.34058C13.0762 2.34058 13.5335 2.50796 13.8945 2.81306L20.8945 8.81206C21.1167 8.99985 21.2953 9.23387 21.4177 9.49777C21.5402 9.76168 21.6036 10.0491 21.6035 10.3401V19.3401C21.6035 19.8705 21.3928 20.3792 21.0177 20.7543C20.6427 21.1293 20.1339 21.3401 19.6035 21.3401H5.60352C5.07308 21.3401 4.56437 21.1293 4.1893 20.7543C3.81423 20.3792 3.60352 19.8705 3.60352 19.3401V10.3401Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
            <path d="M8.10352 15.3406L13.1035 10.3406L8.10352 5.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-black text-base font-['Arial']">Warranty Extension</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Contact */}
          <div className="flex-1 pr-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=1144"
              alt="Warranty certificate product image"
              width="1144"
              height="760"
              className="w-full h-auto mb-12 object-contain"
              loading="eager"
              srcSet="https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=480 480w, https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=768 768w, https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=1024 1024w, https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=1440 1440w"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* Contact Section */}
            <SupportContact phone="+49 12334 123124" />

            {/* Important Notice */}
            <div className="bg-[#F2F2F2] rounded p-10 relative">
              <div className="text-black text-[80px] font-['Arial'] opacity-30 absolute left-4 top-1">!</div>
              <div className="bg-white border border-[#E1E1E1] rounded-lg p-6 mt-6">
                <div className="text-[#D60D0D] text-lg font-['Arial'] font-bold mb-2">
                  <p>Ważne: Wymagane powiązanie urządzeń </p>
                </div>
                <div className="text-black text-base font-['Arial'] leading-6">
                  <div>
                    <p>
                      Ta ​​lista zawiera dostępne gwarancje, które możesz
                      przypisać klientowi. Prosimy o ich wykorzystanie w
                      ciągu XXX dni. Jeśli nie wykorzystasz wszystkich
                      gwarancji, zostaną one w pełni zwrócone po upływie
                      terminu ważności (BBB). Jeśli nie chcesz, aby zwrot
                      został wykonany, utwórz certyfikat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:sticky lg:top-8">
            <div className="mb-6">
              <h1 className="text-black text-4xl font-['Arial'] font-bold mb-6">Warranty Extension Purchase</h1>
              <div className="text-black text-base font-['Arial'] leading-6 mb-6">
                Wybierz rodzaj przedłużenia gwarancji na 1,2 lub 3 lata.
                Opis ten pojawi się na certyfikacie klienta. Po
                dokonaniu zakupu przekaż gwarancję klientowi.
              </div>

              {/* Features */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none">
                    <path d="M13.9382 4.34058L6.60482 11.6739L3.27148 8.34058" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-black text-sm font-['Arial']">
                    Obejmuje koszty napraw i wymiany wykraczające poza
                    standardową gwarancję
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none">
                    <path d="M13.9382 4.34058L6.60482 11.6739L3.27148 8.34058" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-black text-sm font-['Arial']">
                    Łatwy proces składania reklamacji z ważnym
                    certyfikatem
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none">
                    <path d="M13.9382 4.34058L6.60482 11.6739L3.27148 8.34058" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-black text-sm font-['Arial']">
                    Spokój ducha dla Twoich klientów
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-8">
              <h3 className="text-black text-base font-['Arial'] font-bold mb-4">Prices excl. VAT</h3>

              <fieldset>
                <legend className="text-black text-sm font-['Arial'] font-medium mb-2">Select warranty duration</legend>
                <div className="space-y-5">
                {/* 1 Year Option */}
                <div className={`group rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPlan === '1-year'
                    ? 'border-2 border-[#224BFF]'
                    : 'border border-[rgba(0,0,0,0.25)] hover:border-[#224BFF]'
                }`}
                onClick={() => setSelectedPlan('1-year')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-6 h-6">
                        <input
                          id="plan-1-year"
                          type="radio"
                          name="warranty-plan"
                          value="1-year"
                          checked={selectedPlan === '1-year'}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="peer absolute inset-0 w-6 h-6 opacity-0 cursor-pointer"
                        />
                        <span className="block w-6 h-6 rounded-full border border-black/40"></span>
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#224BFF] transition-transform duration-150 scale-0 peer-checked:scale-100 group-hover:scale-100"></span>
                      </div>
                      <div>
                        <label htmlFor="plan-1-year" className="text-black text-base font-['Arial'] font-bold cursor-pointer">1 Year</label>
                        <div className="text-black text-sm font-['Arial']">109.00 zł</div>
                      </div>
                    </div>
                    <div className="text-black text-base font-['Arial'] font-bold">109.00 zł / year</div>
                  </div>
                </div>

                {/* 2 Year Option */}
                <div className={`group rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPlan === '2-year'
                    ? 'border-2 border-[#224BFF]'
                    : 'border border-[rgba(0,0,0,0.25)] hover:border-[#224BFF]'
                }`}
                onClick={() => setSelectedPlan('2-year')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-6 h-6">
                        <input
                          id="plan-2-year"
                          type="radio"
                          name="warranty-plan"
                          value="2-year"
                          checked={selectedPlan === '2-year'}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="peer absolute inset-0 w-6 h-6 opacity-0 cursor-pointer"
                        />
                        <span className="block w-6 h-6 rounded-full border border-black/40"></span>
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#224BFF] transition-transform duration-150 scale-0 peer-checked:scale-100 group-hover:scale-100"></span>
                      </div>
                      <div>
                        <label htmlFor="plan-2-year" className="text-black text-base font-['Arial'] font-bold cursor-pointer">2 Year</label>
                        <div className="text-black text-sm font-['Arial']">269.79 zł</div>
                      </div>
                    </div>
                    <div className="text-black text-base font-['Arial'] font-bold">99.99 zł / year</div>
                  </div>
                </div>

                {/* 3 Year Option */}
                <div className={`group rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedPlan === '3-year'
                    ? 'border-2 border-[#224BFF]'
                    : 'border border-[rgba(0,0,0,0.25)] hover:border-[#224BFF]'
                }`}
                onClick={() => setSelectedPlan('3-year')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-6 h-6">
                        <input
                          id="plan-3-year"
                          type="radio"
                          name="warranty-plan"
                          value="3-year"
                          checked={selectedPlan === '3-year'}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="peer absolute inset-0 w-6 h-6 opacity-0 cursor-pointer"
                        />
                        <span className="block w-6 h-6 rounded-full border border-black/40"></span>
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#224BFF] transition-transform duration-150 scale-0 peer-checked:scale-100 group-hover:scale-100"></span>
                      </div>
                      <div>
                        <label htmlFor="plan-3-year" className="text-black text-base font-['Arial'] font-bold cursor-pointer">3 Year</label>
                        <div className="text-black text-sm font-['Arial']">269.79.00 zł</div>
                      </div>
                    </div>
                    <div className="text-black text-base font-['Arial'] font-bold">98.99 zł / year</div>
                  </div>
                </div>
              </div>
              </fieldset>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-black text-base font-['Arial'] mb-2 block">Quantity (max 20)</label>
                <div className="inline-flex items-stretch border-2 border-gray-300 rounded-lg h-11 bg-white overflow-hidden">
                  <button type="button" aria-label="Decrease quantity" className="px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setQuantity(q => clamp(q - 1, 1, 20))}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(clamp(Number(e.target.value || 0), 1, 20))}
                    onBlur={(e) => setQuantity(clamp(Number(e.target.value || 0), 1, 20))}
                    min={1}
                    max={20}
                    aria-describedby="qty-help"
                    className="w-16 text-center bg-transparent text-black text-base font-['Arial'] outline-none"
                  />
                  <button type="button" aria-label="Increase quantity" className="px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setQuantity(q => clamp(q + 1, 1, 20))}>+</button>
                </div>
                <p id="qty-help" className="text-xs text-gray-500 mt-1">Min 1, Max 20</p>
              </div>

              <button
                id="add-to-cart-btn"
                disabled={!selectedPlan || quantity < 1 || quantity > 20}
                onClick={() => {
                  if (selectedPlan && quantity >= 1 && quantity <= 20) {
                    const years = Number(String(selectedPlan).charAt(0)) as 1 | 2 | 3;
                    addItem({
                      id: `plan-${years}`,
                      title: "Warranty extension",
                      years,
                      qty: quantity,
                      image: "https://api.builder.io/api/v1/image/assets/TEMP/ef9b33f3c46429a941ed8dc4551bf0c77023e89f?width=240",
                    });
                    setAddedToCart(true);
                  }
                }}
                className={`w-full h-[59px] rounded-lg font-bold text-[17px] flex items-center justify-center gap-3 transition-all duration-200 ${
                  !selectedPlan || quantity < 1 || quantity > 20
                    ? 'bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] cursor-not-allowed'
                    : 'bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                  <path d="M0.770508 1.00732H3.43717L5.22384 9.93399C5.2848 10.2409 5.45178 10.5166 5.69554 10.7129C5.9393 10.9091 6.24431 11.0133 6.55717 11.0073H13.0372C13.35 11.0133 13.6551 10.9091 13.8988 10.7129C14.1426 10.5166 14.3095 10.2409 14.3705 9.93399L15.4372 4.34066H4.10384M6.77051 14.3407C6.77051 14.7088 6.47203 15.0073 6.10384 15.0073C5.73565 15.0073 5.43717 14.7088 5.43717 14.3407C5.43717 13.9725 5.73565 13.674 6.10384 13.674C6.47203 13.674 6.77051 13.9725 6.77051 14.3407ZM14.1038 14.3407C14.1038 14.7088 13.8054 15.0073 13.4372 15.0073C13.069 15.0073 12.7705 14.7088 12.7705 14.3407C12.7705 13.9725 13.069 13.674 13.4372 13.674C13.8054 13.674 14.1038 13.9725 14.1038 14.3407Z" stroke="#202020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {totalLabel}
              </button>
              <div className="sr-only" aria-live="polite">
                {selectedPlan ? `Selected plan ${selectedPlan}, quantity ${quantity}, price per year ${selectedPrice?.toFixed(2)} zł` : 'No plan selected'}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-black text-4xl font-['Arial'] font-bold mb-6">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full border border-[#969C9F] rounded-lg divide-y">
            <AccordionItem value="item-1" className="px-4">
              <AccordionTrigger className="text-left">How do I generate a warranty certificate?</AccordionTrigger>
              <AccordionContent>
                <p className="text-black text-base font-['Arial'] leading-6">
                  After purchase, go to "My Account" &gt; "Order History" &gt; "Generate Certificate". For each warranty, enter the customer's details and device details. Then click on "Generate Certificate" and your certificate will be downloaded and also available in "My Account" &gt; "Registered Warranties".
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-4">
              <AccordionTrigger className="text-left">What happens if I don't link the warranty to a device?</AccordionTrigger>
              <AccordionContent>
                <p className="text-black text-base font-['Arial'] leading-6">
                  If a warranty is not linked to a device and certificate generated within <span className="font-bold">30 days</span>, the order will be automatically cancelled and refunded.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-4">
              <AccordionTrigger className="text-left">What if my order is cancelled but I already generated some certificates?</AccordionTrigger>
              <AccordionContent>
                <p className="text-black text-base font-['Arial'] leading-6">
                  If you cancel an order and some warranties from that order have already been linked to devices, those certificates will remain valid. However, you won't be able to generate any new certificates from the cancelled order. If the cancellation happens within <span className="font-bold">14 days of purchase</span>, you will be refunded for the warranties not yet linked to any devices.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
}
