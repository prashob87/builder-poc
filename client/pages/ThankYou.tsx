import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportContact from "@/components/SupportContact";
import { useCart } from "@/hooks/use-cart";
import FinalWarrantyAssignment from "@/components/FinalWarrantyAssignment";

export default function ThankYou() {
  const navigate = useNavigate();
  const { count } = useCart();
  const orderNumber = "A2W-PL-3043232120";
  const purchaseDate = "August 20, 2025";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showUserActions={true} activeTab="purchase" assignBadgeCount={count} showMiniCart={false} showCartBadge={false} />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 lg:px-[90px] py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-20">
          
          {/* Thank You Header */}
          <div className="w-full pt-13 pb-3 flex justify-center">
            <h1 className="text-4xl font-bold text-black font-[Arial] text-center">
              Thank you for your purchase!
            </h1>
          </div>

          {/* Order Details Section */}
          <div className="w-full border border-[#E1E1E1] rounded-lg p-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-black font-[Arial]">Order Details</h2>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-base text-black font-[Arial] leading-6">
                    Keep this information for your records
                  </p>
                </div>
                <div className="bg-[#E1E1E1] rounded-2xl px-8 py-1 w-fit">
                  <span className="text-base text-black font-[Arial]">confirmed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="text-base text-[#616161] font-[Arial] leading-6 mb-1">ORDER NUMBER</div>
                    <div className="text-base font-bold text-black font-['Space_Mono'] leading-4">
                      {orderNumber}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-base text-[#B8B8B8] font-[Arial] leading-6 mb-1">PURCHASE DATE</div>
                    <div className="text-base text-black font-[Arial] leading-4">
                      {purchaseDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Protection Setup Section */}
          <div className="w-full border border-[#E1E1E1] rounded-lg p-6">
            <FinalWarrantyAssignment className="-mx-6 -mt-6" />
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Bookmark Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-12 bg-[#EDEDED] rounded-lg flex items-center justify-center">
                  <svg width="40" height="47" viewBox="0 0 40 47" fill="none" className="w-10 h-12">
                    <rect width="40" height="47" rx="8" fill="#EDEDED"/>
                    <path d="M28.3333 21.5416V35.1912L20 30.9996L11.6667 35.1912V9.79121H21.6667V5.87454H11.6667C9.83333 5.87454 8.33333 7.63704 8.33333 9.79121V41.1246L20 35.2496L31.6667 41.1246V21.5416H28.3333ZM29.7167 17.6246L25 12.0829L27.35 9.32121L29.7 12.0829L35.6 5.15037L37.95 7.91204L29.7167 17.6246Z" fill="black"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-black font-[Arial] leading-6 mb-2">
                    Warranty Protection Setup
                  </h3>
                  <p className="text-base text-[#555] font-[Arial] leading-6">
                    Assign Warranty to your customers now. Follow these simple steps to activate:
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-medium">1</span>
                    </div>
                    <div className="text-lg font-bold text-black font-[Arial] leading-8">
                      Go to My Account → Order History and link it to a registered device
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-medium">2</span>
                    </div>
                    <div className="text-lg font-bold text-black font-[Arial] leading-8">
                      A digital certificate will be generated and made available for download
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-medium">3</span>
                    </div>
                    <div className="text-lg font-bold text-black font-[Arial] leading-8">
                      You may cancel your purchase within 14 days for a full refund
                    </div>
                  </div>
                </div>

                {/* Assign Warranty Button */}
                <div className="w-full lg:w-[328px]">
                  <Button
                    className="w-full bg-[#F9CB3A] text-black font-bold text-[17px] py-6 transition-all duration-200 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                    onClick={() => navigate('/assign-warranty')}
                  >
                    Assign Warranty
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-2">
                      <path d="M15 19L13.575 17.6L18.175 13H2V11H18.175L13.625 6.4L15 5L22 12L15 19Z" fill="black"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>


          {/* Need Help Section */}
          <div className="w-full border border-[#D9D9D9] rounded-lg py-6 px-20">
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold text-black font-[Arial] leading-6">Need Help?</h3>
            </div>
            <div className="flex justify-center">
              <SupportContact phone="+49 12334 123124" size="lg" className="mb-0" />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
