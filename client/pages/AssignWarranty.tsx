import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportContact from "@/components/SupportContact";
import FinalWarrantyAssignment from "@/components/FinalWarrantyAssignment";
import AccountSidebar from "@/components/AccountSidebar";

interface WarrantyOrder {
  id: string;
  purchaseDate: string;
  orderId: string;
  registeredWarranties: number;
  availableWarranties: number;
}

type SortField = 'purchaseDate' | 'orderId' | 'registeredWarranties' | 'availableWarranties';
type SortDirection = 'asc' | 'desc';

export default function AssignWarranty() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('purchaseDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  
  const warrantyOrders: WarrantyOrder[] = [
    {
      id: "1",
      purchaseDate: "01.01.2025",
      orderId: "#123456",
      registeredWarranties: 10,
      availableWarranties: 10
    },
    {
      id: "2",
      purchaseDate: "01.02.2025",
      orderId: "#123457",
      registeredWarranties: 10,
      availableWarranties: 10
    },
    {
      id: "3",
      purchaseDate: "01.01.2024",
      orderId: "#123458",
      registeredWarranties: 10,
      availableWarranties: 10
    },
    {
      id: "4",
      purchaseDate: "01.10.2024",
      orderId: "#123455",
      registeredWarranties: 20,
      availableWarranties: 0
    }
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...warrantyOrders].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Convert dates to comparable format
    if (sortField === 'purchaseDate') {
      aValue = new Date(a.purchaseDate.split('.').reverse().join('-'));
      bValue = new Date(b.purchaseDate.split('.').reverse().join('-'));
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
          <path d="M2.34106 11.0046L5.00773 13.6713M5.00773 13.6713L7.6744 11.0046M5.00773 13.6713V3.00464M14.3411 5.67131L11.6744 3.00464M11.6744 3.00464L9.00773 5.67131M11.6744 3.00464V13.6713" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-black" viewBox="0 0 16 16" fill="none">
        <path d="M8 3L3 8h10l-5-5z" fill="currentColor"/>
      </svg>
    ) : (
      <svg className="w-4 h-4 text-black" viewBox="0 0 16 16" fill="none">
        <path d="M8 13L3 8h10l-5 5z" fill="currentColor"/>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header showUserActions={true} activeTab="assign" assignBadgeCount={5} showMiniCart={false} showCartBadge={false} />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 lg:px-[90px] py-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <button onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M15.541 21.3401V13.3401C15.541 13.0748 15.4357 12.8205 15.2481 12.6329C15.0606 12.4454 14.8062 12.3401 14.541 12.3401H10.541C10.2758 12.3401 10.0214 12.4454 9.83391 12.6329C9.64637 12.8205 9.54102 13.0748 9.54102 13.3401V21.3401M3.54102 10.3401C3.54095 10.0491 3.60435 9.76168 3.7268 9.49777C3.84926 9.23387 4.02781 8.99985 4.25002 8.81206L11.25 2.81306C11.611 2.50796 12.0684 2.34058 12.541 2.34058C13.0137 2.34058 13.471 2.50796 13.832 2.81306L20.832 8.81206C21.0542 8.99985 21.2328 9.23387 21.3552 9.49777C21.4777 9.76168 21.5411 10.0491 21.541 10.3401V19.3401C21.541 19.8705 21.3303 20.3792 20.9552 20.7543C20.5802 21.1293 20.0714 21.3401 19.541 21.3401H5.54102C5.01058 21.3401 4.50187 21.1293 4.1268 20.7543C3.75173 20.3792 3.54102 19.8705 3.54102 19.3401V10.3401Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M8.04102 15.3406L13.041 10.3406L8.04102 5.34058" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-base text-black font-[Arial]">
              My Account &gt; <span className="font-bold">Assign warranties</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
            
            {/* Left Sidebar */}
            <div className="space-y-12">
              <AccountSidebar active="assign" />
            </div>

            {/* Right Content Area */}
            <div className="space-y-6">
              
              {/* Account Data Section */}
              <div className="bg-white border border-[#E1E1E1] rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-black font-[Arial]">Your account data</h2>
                  <Button
                    variant="outline"
                    className="border-[#767676] text-[#1E1E1E]"
                    onClick={() => navigate('/account-data')}
                  >
                    edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                  <div className="space-y-1">
                    <div className="font-bold text-base text-black font-[Arial]">Installation Corp. Inc.</div>
                    <div className="text-base text-black font-[Arial]">1234567890</div>
                    <div className="text-base text-black font-[Arial]">Anna Gallagher</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-base text-black font-[Arial]">gallagher@domain.com</div>
                    <div className="text-base text-black font-[Arial]">+353 1 234 5678</div>
                    <div className="text-base text-black font-[Arial]">12 Cedar Lane, Rathmines, 11-12345 Warsaw, Poland</div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-white border border-[#E1E1E1] rounded-lg p-8">
                <div className="text-lg font-bold text-[#D60D0D] font-[Arial] mb-2">
                  <p>Ważne: Wymagane jest połączenie urządzeń</p>
                </div>
                <p className="text-base text-black font-[Arial] leading-6">
                  Ta ​​lista zawiera dostępne gwarancje, które możesz
                  przypisać klientowi. Prosimy o ich wykorzystanie w ciągu
                  XXX dni. Jeśli nie wykorzystasz wszystkich gwarancji,
                  zostaną one w pełni zwrócone po upływie terminu ważności
                  (BBB). Jeśli nie chcesz, aby zwrot został wykonany,
                  utwórz certyfikat.
                </p>
              </div>
            </div>
          </div>

          {/* Full Width Table Section */}
          <div className="bg-white border border-[#E1E1E1] rounded-lg overflow-hidden mt-8">
                <div className="space-y-12">

                  <FinalWarrantyAssignment className="-mx-8 w-[calc(100%+4rem)] px-8" />

                  <div className="space-y-6 px-8 pb-8">

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6 w-[15%]">
                              <button
                                className="flex items-center gap-2 text-base font-bold text-black font-[Arial] hover:text-blue-600 transition-colors"
                                onClick={() => handleSort('purchaseDate')}
                              >
                                Purchase date
                                <SortIcon field="purchaseDate" />
                              </button>
                            </th>
                            <th className="text-left py-4 px-6 w-[15%]">
                              <button
                                className="flex items-center gap-2 text-base font-bold text-black font-[Arial] hover:text-blue-600 transition-colors"
                                onClick={() => handleSort('orderId')}
                              >
                                Order ID
                                <SortIcon field="orderId" />
                              </button>
                            </th>
                            <th className="text-right py-4 px-6 w-[20%]">
                              <button
                                className="flex items-center gap-2 text-base font-bold text-black font-[Arial] hover:text-blue-600 transition-colors ml-auto"
                                onClick={() => handleSort('registeredWarranties')}
                              >
                                Registered warranties
                                <SortIcon field="registeredWarranties" />
                              </button>
                            </th>
                            <th className="text-right py-4 px-6 w-[20%]">
                              <button
                                className="flex items-center gap-2 text-base font-bold text-black font-[Arial] hover:text-blue-600 transition-colors ml-auto"
                                onClick={() => handleSort('availableWarranties')}
                              >
                                Available warranties
                                <SortIcon field="availableWarranties" />
                              </button>
                            </th>
                            <th className="text-right py-4 px-6 w-[30%]">
                              <span className="text-base font-bold text-black font-[Arial]">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedOrders.map((order, index) => (
                            <Fragment key={order.id}>
                              <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                <td className="py-4 px-6 text-base text-black font-[Arial]">{order.purchaseDate}</td>
                                <td className="py-4 px-6 text-base text-black font-[Arial]">{order.orderId}</td>
                                <td className="py-4 px-6 text-base text-black font-[Arial] text-right">{order.registeredWarranties}</td>
                                <td className="py-4 px-6 text-base text-black font-[Arial] text-right">{order.availableWarranties}</td>
                                <td className="py-4 px-6 text-right">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#767676] text-[#1E1E1E] text-xs"
                                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                                  >
                                    {expandedId === order.id ? 'Hide' : 'View'}
                                  </Button>
                                </td>
                              </tr>

                              <AnimatePresence initial={false}>
                                {expandedId === order.id && (
                                  Array.from({ length: (index === 0 ? 2 : index === 1 ? 3 : 1) }).map((_, i) => (
                                    <motion.tr
                                      key={`detail-${order.id}-${i}`}
                                      initial={{ height: 0 }}
                                      animate={{ height: 'auto' }}
                                      exit={{ height: 0 }}
                                      transition={{ duration: 0.9, ease: 'easeOut' }}
                                      className="bg-[#F9FAFB]"
                                      style={{ overflow: 'hidden' }}
                                    >
                                      <td colSpan={5} id={`details-${order.id}-${i}`} className="py-6 px-6">
                                        <div className="flex items-center gap-6">
                                          <div className="w-20 h-20 flex items-center justify-center rounded border border-gray-200 bg-white">
                                            <img src="https://cdn.builder.io/api/v1/image/assets%2Fc2f2e8f867424bc498dd8cb3c4e3c96b%2F1641351ff5bc4ddb9436a7e914a24f7c?format=webp&width=800" alt="Warranty product" className="w-16 h-16 object-contain" />
                                          </div>
                                          <div className="flex-1 flex items-center justify-between gap-8">
                                            <div className="flex items-center gap-16">
                                              <div>
                                                <div className="text-sm text-gray-500 font-[Arial]">Warranty extension</div>
                                                <div className="text-base text-black font-[Arial]">{index === 1 ? `${i + 1} Year${i > 0 ? 's' : ''}` : '1 Year'}</div>
                                              </div>
                                              <div>
                                                <div className="text-sm text-gray-500 font-[Arial]">Quantity left to assign</div>
                                                <div className="text-base text-black font-[Arial]">{order.availableWarranties}</div>
                                              </div>
                                            </div>
                                            <Button
                                              onClick={() => { const key = `${order.id}-${i}`; setAssigningId(key); setTimeout(() => navigate('/assign-warranty-detail', { state: { warrantyId: order.orderId } }), 600); }}
                                              disabled={assigningId === `${order.id}-${i}`}
                                              className={`bg-[#F9CB3A] text-black font-bold text-[14px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-none min-w-[200px] flex items-center justify-center gap-2 transition-transform ${assigningId === `${order.id}-${i}` ? 'scale-95 animate-pulse' : ''}`}
                                            >
                                              {assigningId === `${order.id}-${i}` ? (
                                                <>
                                                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                  </svg>
                                                  Assigning...
                                                </>
                                              ) : (
                                                <>
                                                  Assign to customer
                                                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15.241 19.3406L13.816 17.9406L18.416 13.3406H2.24103V11.3406H18.416L13.841 6.74058L15.241 5.34058L22.241 12.3406L15.241 19.3406Z" fill="black"/>
                                                  </svg>
                                                </>
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                      </td>
                                    </motion.tr>
                                  ))
                                )}
                              </AnimatePresence>
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Table View */}
                    <div className="lg:hidden space-y-4">
                      {sortedOrders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm text-gray-500 font-[Arial]">Purchase Date</div>
                              <div className="text-base font-bold text-black font-[Arial]">{order.purchaseDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 font-[Arial]">Order ID</div>
                              <div className="text-base font-bold text-black font-[Arial]">{order.orderId}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500 font-[Arial]">Registered</div>
                              <div className="text-base text-black font-[Arial]">{order.registeredWarranties}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 font-[Arial]">Available</div>
                              <div className="text-base text-black font-[Arial]">{order.availableWarranties}</div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#767676] text-[#1E1E1E] text-xs w-full"
                              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                            >
                              {expandedId === order.id ? 'Hide Details' : 'View Details'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end">
                      <div className="flex items-center h-12 gap-4">
                        <button className="w-8 h-8 flex items-center justify-center border-2 border-transparent">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5495 6.51558L8.73283 10.3406L12.5495 14.1656L11.3745 15.3406L6.3745 10.3406L11.3745 5.34058L12.5495 6.51558Z" fill="#CFCFCF"/>
                          </svg>
                        </button>
                        
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            className={`w-8 h-8 flex items-center justify-center text-sm font-bold ${
                              currentPage === num ? 'border-b-4 border-[#7500C0]' : ''
                            }`}
                            onClick={() => setCurrentPage(num)}
                          >
                            {num}
                          </button>
                        ))}
                        
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-bold">...</span>
                        <button className="w-8 h-8 flex items-center justify-center text-sm font-bold">20</button>
                        
                        <button className="w-8 h-8 flex items-center justify-center border-2 border-transparent">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                            <path d="M8.04102 6.51558L11.8577 10.3406L8.04102 14.1656L9.21602 15.3406L14.216 10.3406L9.21602 5.34058L8.04102 6.51558Z" fill="black"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
