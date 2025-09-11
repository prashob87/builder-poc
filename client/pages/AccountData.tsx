import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AccountData() {
  console.log("AccountData component is rendering");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Anna",
    lastName: "Gallagher",
    companyName: "Installer Corp. Inc.",
    street: "12 Cedar Lane",
    number: "12 Cedar Lane",
    zipCode: "11-12345",
    city: "Warsaw",
    vat: "",
    country: "Poland",
    phoneNumber: "",
    termsAccepted: false,
    purchaseTermsAccepted: false
  });

  const [showVatSpinner, setShowVatSpinner] = useState(false);
  const [isVatValid, setIsVatValid] = useState(false);
  const [vatValidationComplete, setVatValidationComplete] = useState(false);
  const [vatSaved, setVatSaved] = useState(false);

  const handleVatSave = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && 'preventDefault' in e) (e as any).preventDefault();
    if (isVatValid) {
      setVatSaved(true);
      console.log('VAT saved:', formData.vat);
    }
  };

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);



  const validateVAT = (vat: string): boolean => {
    const vatRegex = /^(AT\s*(U\d{8}))|(BE\s*(0?\d{9}))|(BG\s*(\d{9,10}))|(CY\s*(\d{8}[A-Z]))|(DE\s*(\d{9}))$/;
    return vatRegex.test(vat.trim());
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Handle VAT field validation and spinner
    if (field === 'vat' && typeof value === 'string') {
      const isValid = validateVAT(value);
      const shouldShowSpinner = value.length >= 3 && !isValid;

      setIsVatValid(isValid && value.length > 0);
      setShowVatSpinner(shouldShowSpinner);

      // Update address fields when VAT validation is successful for the first time
      if (isValid && value.length > 0 && !vatValidationComplete) {
        setVatValidationComplete(true);
        setFormData(prev => ({
          ...prev,
          [field]: value, // Keep the VAT value
          street: "ul. Krakowskie Przedmieście",
          number: "221B",
          zipCode: "00-071",
          phoneNumber: "501234567"
        }));
      }
    }
  };





  return (
    <>

      <div className="min-h-screen bg-white flex flex-col">
        <Header showUserActions={true} activeTab="purchase" hideBadges />

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-[90px] py-12 gap-6 w-full max-w-[1980px] mx-auto">
          <h1 className="text-black text-4xl font-bold font-[Arial] w-full max-w-[1023px]">Account data</h1>
          
          <div className="w-full max-w-[1023px] flex flex-col gap-6">
            {/* Your Profile Section */}
            <div className="border border-[#E1E1E1] rounded-lg p-6 flex flex-col gap-6">
              <h2 className="text-black text-3xl font-bold font-[Arial] mb-2">Your Profile</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Column 1 - VAT Verification */}
                <div className={`rounded-lg p-4 shadow-sm border ${vatSaved ? 'bg-green-50 border-green-300' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-black text-lg font-bold font-[Arial] text-blue-700">VAT Verification</h3>
                    {vatSaved && (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Saved
                      </span>
                    )}
                  </div>

                  <form className="flex flex-col gap-3" onSubmit={(e) => handleVatSave(e)}>
                    <div className="flex flex-col gap-2">
                      <label className="text-black text-sm font-semibold font-[Arial]">VAT Number*</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.vat}
                          onChange={(e) => handleInputChange('vat', e.target.value)}
                          disabled={vatSaved}
                          readOnly={vatSaved}
                          className={`h-10 px-3 py-2 pr-12 border-2 rounded-lg bg-white text-black text-sm font-[Arial] outline-none w-full transition-all ${vatSaved ? 'border-gray-300 cursor-not-allowed opacity-75' : 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                          placeholder="e.g. DE 123456789"
                        />
                        {/* Show spinner while validating (3+ chars but not valid) */}
                        {!vatSaved && showVatSpinner && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="animate-spin h-4 w-4 text-blue-600"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                        )}
                        {/* Show checkmark when valid (same design as first page) */}
                        {(isVatValid || vatSaved) && !showVatSpinner && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="h-4 w-4 text-green-600"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Save Button */}
                    <button
                      type="submit"
                      onClick={(e) => handleVatSave(e)}
                      className={`w-full h-9 font-semibold text-sm rounded-lg transition-all duration-200 ${
                        vatSaved ? 'bg-gray-200 text-gray-700 cursor-not-allowed border-2 border-gray-300' : isVatValid
                          ? 'bg-[#F9CB3A] text-black hover:shadow-lg active:shadow-inner border-2 border-yellow-500'
                          : 'text-gray-600 cursor-not-allowed border-2 border-gray-300'
                      }`}
                      style={!vatSaved && !isVatValid ? { backgroundColor: 'rgba(249, 203, 58, 0.5)' } : {}}
                      disabled={vatSaved || !isVatValid}
                    >
                      {vatSaved ? 'Saved' : isVatValid ? 'Save VAT' : 'Enter VAT to Save'}
                    </button>
                    {vatSaved && (
                      <p className="text-xs text-black font-[Arial] mt-2">
                        We have updated your company credentials - please <a href="#terms" className="font-semibold underline text-blue-700 hover:text-blue-800">confirm</a>
                      </p>
                    )}
                  </form>
                </div>

                {/* Column 2 - Contact Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-blue-300 transition-all duration-200 cursor-pointer group">
                  <div className="mb-3">
                    <h3 className="text-black text-lg font-bold font-[Arial] text-blue-700">Contact Information</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Email</span>
                      <span className="text-black text-base font-[Arial]">gallagher@domain.com</span>
                    </div>
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Phone</span>
                      <span className="text-black text-base font-[Arial]">+353 1 234 5678</span>
                    </div>
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Address</span>
                      <span className="text-black text-base font-[Arial]">12 Cedar Lane, Rathmines<br />11-12345 Warsaw, Poland</span>
                    </div>
                  </div>
                </div>

                {/* Column 3 - Company Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-blue-300 transition-all duration-200 cursor-pointer group">
                  <div className="mb-3">
                    <h3 className="text-black text-lg font-bold font-[Arial] text-blue-700">Company Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Company</span>
                      <span className="text-black text-base font-bold font-[Arial]">Installation Corp. Inc.</span>
                    </div>
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Company ID</span>
                      <span className="text-black text-base font-[Arial]">1234567890</span>
                    </div>
                    <div className="flex flex-col group-hover:bg-white rounded p-1 transition-all">
                      <span className="text-xs text-gray-500 font-[Arial] uppercase tracking-wide">Contact Person</span>
                      <span className="text-black text-base font-[Arial]">Anna Gallagher</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verify Customer Data Section */}
            <div className="border border-[#E1E1E1] rounded-lg p-6 flex flex-col gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-[26px] h-7 bg-[#EDEDED] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M18.748 13.1739V21.3056L13.3314 18.8089L7.91471 21.3056V6.17394H14.4147V3.8406H7.91471C6.72305 3.8406 5.74805 4.8906 5.74805 6.17394V24.8406L13.3314 21.3406L20.9147 24.8406V13.1739H18.748ZM19.6472 10.8406L16.5814 7.53894L18.1089 5.89394L19.6364 7.53894L23.4714 3.40894L24.9989 5.05394L19.6472 10.8406Z" fill="black"/>
                        </svg>
                      </div>
                      <h3 className="text-black text-xl font-bold font-[Arial]">
                        Verify your Customer Data with Panasonic
                      </h3>
                    </div>
                    <div className="flex items-start gap-2 ml-8">
                      <p className="text-black text-base font-[Arial] leading-6">
                        Before you purchase and make the assignment to your customer please verify once if your data are up-to date in our system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                
                {/* Log in data */}
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-black text-2xl font-bold font-[Arial] text-blue-700">Login Credentials</h3>
                    <button
                      type="button"
                      aria-expanded={loginOpen}
                      onClick={() => setLoginOpen((v) => !v)}
                      aria-label="Toggle login credentials"
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg className={`w-6 h-6 transition-transform ${loginOpen ? 'rotate-180' : ''}`} viewBox="0 0 25 25" fill="none">
                        <path d="M6.83203 9.34058L12.832 15.3406L18.832 9.34058" stroke="#969C9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {loginOpen && (
                  <div className="flex gap-5">
                    {/* Email Address */}
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-semibold font-[Arial] leading-6">Email Address*</label>
                      <div className="h-11 px-3 py-6 bg-white border-2 border-gray-300 rounded-lg flex items-center transition-all hover:border-blue-300">
                        <span className="text-[#969C9F] text-base font-[Arial]">anna.gallagher@domain.com</span>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-semibold font-[Arial] leading-6">New Password*</label>
                      <div className="h-11 px-3 py-6 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between transition-all hover:border-blue-300">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="flex-1 text-base text-black font-[Arial] outline-none bg-transparent"
                        />
                        <button
                          type="button"
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowNewPassword((v) => !v)}
                          className="text-panasonic-blue hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded p-1"
                        >
                          {showNewPassword ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* Company Representative Section */}
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-5">
                  <h3 className="text-black text-2xl font-bold font-[Arial] text-blue-700">Company Representative</h3>

                  {/* Names */}
                  <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">First Name*</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        readOnly
                        disabled
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">Last Name*</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        readOnly
                        disabled
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-black text-2xl font-bold font-[Arial]">Company Name*</h3>
                    <div className="h-11 px-3 py-6 bg-white border-2 border-gray-300 rounded-lg flex items-center">
                      <span className="text-[#969C9F] text-base font-[Arial]">Installer Corp. Inc.</span>
                    </div>
                  </div>


                  {/* Address data */}
                  <h3 className="text-black text-2xl font-bold font-[Arial]">Address data</h3>

                  {/* Address */}
                  <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">Street*</label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">Number*</label>
                      <input
                        type="text"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none"
                      />
                    </div>
                  </div>

                  {/* ZIP, City */}
                  <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">ZIP Code*</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">City*</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="h-11 px-3 py-6 border-2 border-gray-300 rounded-lg bg-white text-black text-base font-[Arial] outline-none"
                      />
                    </div>
                  </div>

                  {/* Country and Phone */}
                  <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">Country*</label>
                      <div className="h-11 px-3 py-6 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between">
                        <span className="text-[#969C9F] text-base font-[Arial]">Poland</span>
                        <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                          <path d="M6.83203 9.34058L12.832 15.3406L18.832 9.34058" stroke="#969C9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-black text-base font-[Arial] leading-6">Phone Number*</label>
                      <div className="flex">
                        <div className="w-[62px] h-11 border-2 border-gray-300 border-r-0 rounded-l bg-white flex items-center justify-center gap-1">
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/e65027fb4586d9713ddbefaf9ea9ee70338ee491?width=40" 
                            alt="Poland flag" 
                            className="w-5 h-[15px]"
                          />
                          <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
                            <path d="M5.83203 7.84058L10.832 12.8406L15.832 7.84058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1 h-11 border-2 border-gray-300 rounded-r bg-white flex items-center px-3">
                          <span className="text-black text-base font-[Arial] mr-2">+48</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data saving notice */}
                  <p className="text-black text-base font-[Arial] leading-6">
                    This data will be saved to your account.
                  </p>

                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 flex flex-col gap-4">
                    <h3 id="terms" className="text-black text-lg font-bold font-[Arial] text-blue-700">Terms & Conditions</h3>
                    <div className="flex items-start gap-3">
                      <div className="pt-1.5">
                        <input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                          className="w-[18px] h-[18px] border-2 border-gray-400 rounded-sm transition-colors checked:bg-blue-600 checked:border-blue-600"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-black text-base font-[Arial] leading-6">
                          I confirm that I have read and agree with the{' '}
                          <span className="font-bold underline text-blue-700 cursor-pointer hover:text-blue-800">Terms and Conditions</span>{' '}
                          of Aquarea Service+ Terms and Conditions and I am aware of the{' '}
                          <span className="font-bold underline text-blue-700 cursor-pointer hover:text-blue-800">Aquarea Service+ Policy Note</span>.*
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="pt-1.5">
                        <input
                          type="checkbox"
                          checked={formData.purchaseTermsAccepted}
                          onChange={(e) => handleInputChange('purchaseTermsAccepted', e.target.checked)}
                          className="w-[18px] h-[18px] border-2 border-gray-400 rounded-sm transition-colors checked:bg-blue-600 checked:border-blue-600"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-black text-base font-[Arial] leading-6">
                          I agree to use this purchase within the timeframe of{' '}
                          <span className="font-bold">XXX</span> days. Otherwise all warranties purchased will be cancelled and refunded fully after{' '}
                          <span className="font-bold">BBB</span> days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-black text-sm font-[Arial] mt-2">*Mandatory fields.</p>

                  {/* Confirm Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate('/pdp')}
                      className="w-[325px] h-12 bg-[#F9CB3A] text-black font-bold text-[17px] rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                        <path d="M9.83047 16.5406L5.63047 12.3406L4.23047 13.7406L9.83047 19.3406L21.8305 7.34055L20.4305 5.94055L9.83047 16.5406Z" fill="black"/>
                      </svg>
                      Confirm Account Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
