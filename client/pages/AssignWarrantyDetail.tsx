import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportContact from "@/components/SupportContact";
import { useCart } from "@/hooks/use-cart";
import AccountSidebar from "@/components/AccountSidebar";
import FinalWarrantyAssignment from "@/components/FinalWarrantyAssignment";

export default function AssignWarrantyDetail() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { warrantyId?: string } };
  const { count } = useCart();
  const [modelTouched, setModelTouched] = useState(false);
  const [modelNoteVisible, setModelNoteVisible] = useState(false);
  const [showSerialSpinner, setShowSerialSpinner] = useState(false);
  const [isSerialValid, setIsSerialValid] = useState(false);
  const [confirmAssign, setConfirmAssign] = useState(false);
  const [formData, setFormData] = useState({
    model: "",
    serialNumber: "",
    warrantyId: "",
    startDate: new Date().toISOString().split('T')[0],
    customerStreet: "",
    customerZip: "",
    customerCity: "",
  });

  useEffect(() => {
    const stateId = location.state?.warrantyId;
    const search = new URLSearchParams(window.location.search);
    const queryId = search.get("warrantyId") || undefined;
    const initialId = stateId || queryId;
    if (initialId) setFormData((prev) => ({ ...prev, warrantyId: initialId }));
  }, [location.state]);

  // Show selected model note briefly
  useEffect(() => {
    if (formData.model) {
      setModelNoteVisible(true);
      const t = setTimeout(() => setModelNoteVisible(false), 5000);
      return () => clearTimeout(t);
    } else {
      setModelNoteVisible(false);
    }
  }, [formData.model]);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'serialNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, serialNumber: digits }));
      const len = digits.length;
      const valid = /^\d{10}$/.test(digits);
      setIsSerialValid(valid);
      setShowSerialSpinner(len >= 3 && len < 10);
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Boolean(
    formData.model &&
    isSerialValid &&
    formData.startDate &&
    (formData.warrantyId ?? '').trim().length >= 3 &&
    (formData.customerStreet ?? '').trim().length >= 3 &&
    (formData.customerZip ?? '').trim().length >= 3 &&
    (formData.customerCity ?? '').trim().length >= 3
  );
  const serialLen = formData.serialNumber.length;
  const showSerialValidation = serialLen >= 3;
  const canGenerate = isFormValid && confirmAssign;


  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header showUserActions activeTab="assign" assignBadgeCount={count} showMiniCart={false} showCartBadge={false} />

      <main className="flex-1 px-4 md:px-8 lg:px-[90px] py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer hover:text-panasonic-blue transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                <path d="M15.6035 21.3401V13.3401C15.6035 13.0748 15.4982 12.8205 15.3106 12.6329C15.1231 12.4454 14.8687 12.3401 14.6035 12.3401H10.6035C10.3383 12.3401 10.0839 12.4454 9.89641 12.6329C9.70887 12.8205 9.60352 13.0748 9.60352 13.3401V21.3401M3.60352 10.3401C3.60345 10.0491 3.66685 9.76168 3.7893 9.49777C3.91176 9.23387 4.09031 8.99985 4.31252 8.81206L11.3125 2.81306C11.6735 2.50796 12.1309 2.34058 12.6035 2.34058C13.0762 2.34058 13.5335 2.50796 13.8945 2.81306L20.8945 8.81206C21.1167 8.99985 21.2953 9.23387 21.4177 9.49777C21.5402 9.76168 21.6036 10.0491 21.6035 10.3401V19.3401C21.6035 19.8705 21.3928 20.3792 21.0177 20.7543C20.6427 21.1293 20.1339 21.3401 19.6035 21.3401H5.60352C5.07308 21.3401 4.56437 21.1293 4.1893 20.7543C3.81423 20.3792 3.60352 19.8705 3.60352 19.3401V10.3401Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <path d="M8.10352 15.3406L13.1035 10.3406L8.10352 5.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <button
              onClick={() => navigate('/account-data')}
              className="text-base text-black font-[Arial] font-bold underline underline-offset-2 hover:text-panasonic-blue transition-colors"
            >
              My Account
            </button>
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <path d="M8.10352 15.3406L13.1035 10.3406L8.10352 5.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <button
              onClick={() => navigate('/assign-warranty')}
              className="text-base text-black font-[Arial] font-bold underline underline-offset-2 hover:text-panasonic-blue transition-colors"
            >
              Order Details
            </button>
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <path d="M8.10352 15.3406L13.1035 10.3406L8.10352 5.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-base text-black font-[Arial]">Generate certificate</span>
          </div>

          <FinalWarrantyAssignment className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
            {/* Left Sidebar */}
            <div className="space-y-12">
              <AccountSidebar active="assign" />
            </div>

            {/* Main Content */}
            <div className="space-y-10">
              {/* Order Information Header */}
              <div className="bg-white border border-[#E1E1E1] rounded-lg p-5">
                <h1 className="text-4xl font-bold text-black font-[Arial] mb-6">Generate certificate</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <div className="text-sm text-[#2C3437] font-[Arial] mb-1">Purchase date</div>
                    <div className="text-base text-black font-[Arial]">01.01.2025</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#2C3437] font-[Arial] mb-1">Order ID</div>
                    <div className="text-base text-black font-[Arial]">123456</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#2C3437] font-[Arial] mb-1">Open warranties</div>
                    <div className="text-base text-black font-[Arial]">10</div>
                  </div>
                </div>
              </div>

              {/* Your Account Data */}
              <div className="bg-white border border-[#E1E1E1] rounded-lg p-6">
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

              {/* Certificate Generation Form */}
              <form noValidate onSubmit={(e) => e.preventDefault()} className="bg-white border border-[#E1E1E1] rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 space-y-10">

                  {/* Model Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <div className="w-8 h-8 bg-panasonic-blue/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-panasonic-blue" viewBox="0 0 24 24" fill="none">
                          <path d="M9 17H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-2M9 17l4-4M9 17l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 font-[Arial]">Model Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Model Dropdown */}
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]" htmlFor="modelSelect">Model*</label>
                        <div className="relative">
                          <select
                            id="modelSelect"
                            name="model"
                            value={formData.model}
                            onChange={(e) => handleInputChange('model', e.target.value)}
                            onBlur={() => setModelTouched(true)}
                            className={`w-full h-11 px-3 border-[0.5px] rounded text-base font-[Arial] appearance-none pr-10 cursor-pointer z-10 relative text-black ${formData.model ? 'border-green-600' : modelTouched ? 'border-red-500' : 'border-black'}`}
                            aria-label="Model selector"
                            aria-invalid={modelTouched && !formData.model}
                            required
                          >
                            <option value="">Select</option>
                            <option value="WH-UDZ07KE5">WH-UDZ07KE5</option>
                            <option value="WH-UDZ09KE5">WH-UDZ09KE5</option>
                            <option value="WH-UDZ12KE5">WH-UDZ12KE5</option>
                          </select>
                          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none z-20" viewBox="0 0 25 25" fill="none">
                            <path d="M6.61133 9.34058L12.6113 15.3406L18.6113 9.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {formData.model && (
                            <svg className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div className="min-h-5">
                          {modelNoteVisible && formData.model ? (
                            <p className="text-xs text-green-700 font-[Arial]">Selected: {formData.model}</p>
                          ) : !formData.model && modelTouched ? (
                            <p className="text-xs text-red-600 font-[Arial]">Please select a model.</p>
                          ) : null}
                        </div>
                      </div>

                      {/* Serial Number */}
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]">Serial Number*</label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={10}
                            value={formData.serialNumber}
                            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                            placeholder="1234567890"
                            className={`w-full h-11 px-3 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${isSerialValid ? 'border-green-600' : showSerialSpinner ? 'border-panasonic-blue' : 'border-black'}`}
                            aria-invalid={showSerialValidation && !isSerialValid}
                            aria-describedby="serial-help"
                          />
                          {showSerialSpinner && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg className="animate-spin h-5 w-5 text-panasonic-blue" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </div>
                          )}
                          {isSerialValid && !showSerialSpinner && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p id="serial-help" className="text-xs text-panasonic-text-gray font-[Arial]">Enter exactly 10 digits.</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Address */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 font-[Arial]">Customer Address</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-base text-black font-[Arial]" htmlFor="customerStreet">Street Address</label>
                        <div className="relative">
                          <input
                            id="customerStreet"
                            type="text"
                            value={formData.customerStreet}
                            onChange={(e) => handleInputChange('customerStreet', e.target.value)}
                            placeholder="Main St 123"
                            className={`w-full h-11 px-3 py-6 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${((formData.customerStreet ?? '').length >= 3) ? 'border-green-600' : 'border-black'}`}
                          />
                          {((formData.customerStreet ?? '').length >= 3) && (
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]" htmlFor="customerZip">ZIP Code</label>
                        <div className="relative">
                          <input
                            id="customerZip"
                            type="text"
                            value={formData.customerZip}
                            onChange={(e) => handleInputChange('customerZip', e.target.value)}
                            placeholder="00-000"
                            className={`w-full h-11 px-3 py-6 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${((formData.customerZip ?? '').length >= 3) ? 'border-green-600' : 'border-black'}`}
                          />
                          {((formData.customerZip ?? '').length >= 3) && (
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]" htmlFor="customerCity">City</label>
                        <div className="relative">
                          <input
                            id="customerCity"
                            type="text"
                            value={formData.customerCity}
                            onChange={(e) => handleInputChange('customerCity', e.target.value)}
                            placeholder="Warsaw"
                            className={`w-full h-11 px-3 py-6 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${((formData.customerCity ?? '').length >= 3) ? 'border-green-600' : 'border-black'}`}
                          />
                          {((formData.customerCity ?? '').length >= 3) && (
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warranty Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 font-[Arial]">Warranty Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Standard Warranty ID */}
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]">Assigned Warranty ID*</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.warrantyId}
                            onChange={(e) => handleInputChange('warrantyId', e.target.value)}
                            placeholder="Assigned warranty ID"
                            className={`w-full h-11 px-3 py-6 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${((formData.warrantyId ?? '').length >= 3) ? 'border-green-600' : 'border-black'}`}
                          />
                          {((formData.warrantyId ?? '').length >= 3) && (
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Start Date */}
                      <div className="space-y-2">
                        <label className="text-base text-black font-[Arial]">Start Date of Warranty Extension*</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            className={`w-full h-11 px-3 py-6 border-[0.5px] rounded bg-white text-base font-[Arial] placeholder:text-[#969C9F] ${formData.startDate ? 'border-green-600' : 'border-black'}`}
                            placeholder="dd.mm.yyyy"
                          />
                          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" viewBox="0 0 25 25" fill="none">
                            <path d="M8.61133 2.34058V6.34058M16.6113 2.34058V6.34058M3.61133 10.3406H21.6113M5.61133 4.34058H19.6113C20.7159 4.34058 21.6113 5.23601 21.6113 6.34058V20.3406C21.6113 21.4451 20.7159 22.3406 19.6113 22.3406H5.61133C4.50676 22.3406 3.61133 21.4451 3.61133 20.3406V6.34058C3.61133 5.23601 4.50676 4.34058 5.61133 4.34058Z" stroke="black" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action & Confirmation */}
                  <div className="mt-8">
                    {/* Confirmation Section */}
                    <div className="bg-panasonic-blue/5 border-2 border-panasonic-blue/20 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input
                            id="confirm-checkbox"
                            type="checkbox"
                            checked={confirmAssign}
                            onChange={(e) => setConfirmAssign(e.target.checked)}
                            className="w-5 h-5 border-2 border-panasonic-blue/50 rounded-sm transition-colors checked:bg-panasonic-blue checked:border-panasonic-blue focus:ring-2 focus:ring-panasonic-blue/20"
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="confirm-checkbox" className="cursor-pointer select-none">
                            <span className="text-gray-900 text-base font-[Arial] leading-relaxed">
                              I confirm that I want to assign this Warranty to this selected customer. This action can not be revered
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button
                        type="button"
                        onClick={() => navigate('/assign-warranty')}
                        className="inline-flex items-center gap-2 text-panasonic-blue text-sm font-semibold underline underline-offset-2 font-[Arial] leading-6 hover:text-panasonic-blue/90 focus:outline-none focus:ring-2 focus:ring-panasonic-blue rounded px-1"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 25 25" fill="none">
                          <path d="M12.6113 19.3406L5.61133 12.3406M5.61133 12.3406L12.6113 5.34058M5.61133 12.3406H19.6113" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-[Arial]">Cancel</span>
                      </button>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <p className="text-sm text-panasonic-text-gray font-[Arial]">*Mandatory fields.</p>
                        <button
                          type="button"
                          onClick={() => {
                            navigate('/warranty-certificate', { state: { ...formData } });
                          }}
                          className="h-12 px-8 font-bold text-[17px] leading-[17px] rounded-lg transition-all duration-200 bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                        >
                          Generate Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
