import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportContact from "@/components/SupportContact";

interface StepProps {
  step: "completed" | "active" | "inactive";
  title: string;
}

const Step = ({ step, title }: StepProps) => {
  const stepStyles = {
    completed: "bg-[#DF6134] text-black",
    active: "bg-[#DF6134] text-[#DF6134] font-bold",
    inactive: "bg-[rgba(0,0,0,0.15)] text-black"
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className={`h-1 w-full rounded ${stepStyles[step].split(' ')[0]}`}></div>
      <div className={`text-sm text-center ${stepStyles[step].split(' ').slice(1).join(' ')}`}>
        {title}
      </div>
    </div>
  );
};

export default function Payment() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [widerrufAccepted, setWiderrufAccepted] = useState(true);
  const [discountCode, setDiscountCode] = useState("");

  const paymentMethods = [
    {
      id: "visa",
      name: "VISA",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/dcdd6838e09b2a64762a6e2e3ad32c6445e3c8ef?width=160"
    },
    {
      id: "mastercard", 
      name: "Mastercard",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/a670c9f3aa7b2ec93871bbe3e7dd4d13b29944c5?width=117"
    },
    {
      id: "paypal",
      name: "PayPal", 
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/b0c4583596391770f8edf21ec64f17f369b193ae?width=169"
    },
    {
      id: "klarna",
      name: "Klarna",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/fad0a67a6bae7b0d8d5650fe2663515af0281faf?width=164"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showUserActions={true} activeTab="purchase" assignBadgeCount={0} showMiniCart={false} />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 lg:px-[90px] py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-24">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <Step step="completed" title="Account" />
                <Step step="active" title="Payment Method" />
                <Step step="inactive" title="Payment" />
              </div>

              {/* Account Data Section */}
              <div className="border border-[#E1E1E1] rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-black font-[Arial]">Your account data</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
                  <div className="space-y-1">
                    <div className="font-bold text-black text-base font-[Arial]">Installation Corp. Inc.</div>
                    <div className="text-black text-base font-[Arial]">1234567890</div>
                    <div className="text-black text-base font-[Arial]">Anna Gallagher</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-black text-base font-[Arial]">gallagher@domain.com</div>
                    <div className="text-black text-base font-[Arial]">+353 1 234 5678</div>
                    <div className="text-black text-base font-[Arial]">12 Cedar Lane, Rathmines, 11-12345 Warsaw, Poland</div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black font-[Arial]">Payment Method*</h2>
                  <p className="text-sm text-black font-[Arial]">
                    You will be redirected to the payment provider afterwards where the payment will be completed.
                  </p>
                </div>

                {/* Payment Options */}
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`group relative rounded-lg p-4 cursor-pointer transition-all bg-white ${
                          selectedPayment === method.id
                            ? 'border-[2.5px] border-[#224BFF] shadow-[0_4px_4px_0_rgba(0,0,0,0.35),0_4px_4px_0_rgba(0,0,0,0.25)]'
                            : 'border border-black/25 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border-[#224BFF]'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-6 h-24">
                          <div className="text-base text-black font-[Arial]">{method.name}</div>
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="max-w-[80px] max-h-[35px] object-contain"
                          />
                        </div>
                        <RadioGroupItem
                          value={method.id}
                          className="absolute top-2 right-2 w-6 h-6 border-black/40 text-[#224BFF] transition-colors group-hover:border-[#224BFF] data-[state=checked]:border-[#224BFF]"
                        />
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                {/* 3D Secure Notice */}
                <div className="bg-[#F0FDF5] border border-[#F4F4F4] rounded-lg p-4">
                  <p className="text-sm text-black font-[Arial]">
                    Our platform only accepts credit cards with 3D Secure enabled. This usually involves entering a code sent to your mobile phone during checkout. To enable this feature, please contact your bank or card issuer or check their website. Alternatively, you can pay via PayPal.
                  </p>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-[#F9FAFB] border border-[#F4F4F4] rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                      className="mt-1.5 w-[18px] h-[18px] border-black/50"
                    />
                    <label htmlFor="terms" className="flex-1 text-base text-black font-[Arial] leading-6">
                      I confirm that I have read and agree with the{" "}
                      <span className="font-bold underline">Terms and Conditions</span>{" "}
                      of Aquarea Service+ Terms and Conditions and I am aware of the{" "}
                      <span className="font-bold underline">Aquarea Service+ Policy Note</span>.*
                    </label>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="widerruf" 
                      checked={widerrufAccepted}
                      onCheckedChange={(checked) => setWiderrufAccepted(!!checked)}
                      className="mt-1.5 w-[18px] h-[18px] border-black/50"
                    />
                    <label htmlFor="widerruf" className="flex-1 text-base text-black font-[Arial] leading-6">
                      Ich bitte ausdrücklich darum und stimme zu, dass Sie mit der Ausführung der vertraglich vereinbarten Dienstleistung vor Ablauf der Widerrufsfrist beginnen. Ich bin verpflichtet, alle Dienstleistungen, einschließlich Reparatur- und Wartungsleistungen, die vor Ausübung des 14-tägigen Widerrufsrechts erbracht wurden, zu bezahlen.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Cost Summary */}
            <div className="space-y-6">
              <div className="bg-[#F2F2F2] rounded-lg p-6">
                <h3 className="text-2xl font-bold text-black font-[Arial] mb-6">Total cost summary</h3>
                
                <div className="space-y-6">
                  {/* Line Items */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base text-black font-[Arial]">1x Warranty Extension (2 Years)</span>
                      <span className="text-base text-black font-[Arial]">199.00 zł</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base text-black font-[Arial]">18x Warranty Extension (1 Year)</span>
                        <span className="text-base text-black font-[Arial]">2199.80 zł</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-base text-[#9A9A9A] font-[Arial]">per item: 109.99 zł</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-base text-black font-[Arial]">1x Warranty Extension (3 Years)</span>
                      <span className="text-base text-black font-[Arial]">269.97 zł</span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-base text-black font-[Arial]">Subtotal</span>
                    <span className="text-base text-black font-[Arial]">2,668.77 zł</span>
                  </div>

                  {/* VAT */}
                  <div className="flex justify-between items-center">
                    <span className="text-base text-black font-[Arial]">VAT (23%)</span>
                    <span className="text-base text-black font-[Arial]">{'613.82 zł'}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
                    <span className="text-black font-[Arial]">Total cost</span>
                    <span className="text-black font-[Arial]">3,282.59 zł</span>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="mt-8">
                  <Input
                    placeholder="Enter Discount Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full border-black/14 text-base font-[Arial]"
                  />
                </div>

                {/* Checkout Button */}
                <Button
                  className={`w-full mt-6 font-bold text-[17px] py-6 transition-all duration-200 ${
                    selectedPayment && termsAccepted && widerrufAccepted
                      ? 'bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]'
                      : 'bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] cursor-not-allowed'
                  }`}
                  disabled={!selectedPayment || !termsAccepted || !widerrufAccepted}
                  onClick={() => {
                    const items = [
                      { name: "Warranty Extension (2 Years)", amount: 199.0, currency: "pln", quantity: 1 },
                      { name: "Warranty Extension (1 Year)", amount: 109.99, currency: "pln", quantity: 18 },
                      { name: "Warranty Extension (3 Years)", amount: 269.97, currency: "pln", quantity: 1 },
                    ];
                    navigate('/stripe-payment', { state: { items } });
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 17 17" fill="none">
                    <path d="M5.60221 8.17383V5.50716C5.60221 4.62311 5.9534 3.77526 6.57852 3.15014C7.20365 2.52502 8.05149 2.17383 8.93555 2.17383C9.8196 2.17383 10.6674 2.52502 11.2926 3.15014C11.9177 3.77526 12.2689 4.62311 12.2689 5.50716V8.17383M4.26888 8.17383H13.6022C14.3386 8.17383 14.9355 8.77078 14.9355 9.50716V14.1738C14.9355 14.9102 14.3386 15.5072 13.6022 15.5072H4.26888C3.5325 15.5072 2.93555 14.9102 2.93555 14.1738V9.50716C2.93555 8.77078 3.5325 8.17383 4.26888 8.17383Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Checkout
                </Button>
              </div>

              {/* SSL Security */}
              <div className="flex items-center justify-center gap-2 text-center">
                <svg className="w-4 h-3" viewBox="0 0 16 13" fill="none">
                  <path d="M4.39648 6.34058V4.34058C4.39648 3.67753 4.72572 3.04165 5.31178 2.57281C5.89783 2.10397 6.69268 1.84058 7.52148 1.84058C8.35029 1.84058 9.14514 2.10397 9.73119 2.57281C10.3172 3.04165 10.6465 3.67753 10.6465 4.34058V6.34058M3.14648 6.34058H11.8965C12.5868 6.34058 13.1465 6.78829 13.1465 7.34058V10.8406C13.1465 11.3929 12.5868 11.8406 11.8965 11.8406H3.14648C2.45613 11.8406 1.89648 11.3929 1.89648 10.8406V7.34058C1.89648 6.78829 2.45613 6.34058 3.14648 6.34058Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs text-black font-[Arial]">SSL encrypted - secure connection</span>
              </div>

              {/* Support Contact */}
              <SupportContact />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
