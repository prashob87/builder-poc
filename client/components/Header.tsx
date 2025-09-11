import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";

interface HeaderProps {
  showTopBar?: boolean;
  showUserActions?: boolean;
  activeTab?: "purchase" | "assign" | "history" | "account" | null;
  assignBadgeCount?: number;
  cartBadgeCount?: number;
  hideBadges?: boolean;
  showMiniCart?: boolean;
  showCartBadge?: boolean;
}

export default function Header({
  showTopBar = true,
  showUserActions = false,
  activeTab = null,
  assignBadgeCount = 0,
  cartBadgeCount = 0,
  hideBadges = false,
  showMiniCart = true,
  showCartBadge = true,
}: HeaderProps) {
  const [mobileTopOpen, setMobileTopOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { items, count, priceByYears, lineTotal, subtotal, lastAddedAt } = useCart();
  const canHoverMiniCart = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isCartPage = location.pathname === '/cart';
  const isWarrantyCertificatePage = location.pathname === '/warranty-certificate';
  const isAssignWarrantyPage = location.pathname === '/assign-warranty';
  const isAssignWarrantyDetailPage = location.pathname === '/assign-warranty-detail';
  const isAccountDataPage = location.pathname === '/account-data';
  const isLoginPage = location.pathname === '/';
  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isEmailPasswordResetPage = location.pathname === '/email-password-reset';
  const shouldHideMiniCart = isCartPage || isWarrantyCertificatePage || isAssignWarrantyPage || isAssignWarrantyDetailPage || isAccountDataPage || isLoginPage || isForgotPasswordPage || isEmailPasswordResetPage;
  const shouldHideCart = isLoginPage || isForgotPasswordPage || isEmailPasswordResetPage;

  const topLinks = ["ProClub", "About Us", "Career", "Support"];

  useEffect(() => {
    if (!lastAddedAt || !showMiniCart || shouldHideMiniCart) return;
    setMiniCartOpen(true);
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); }
    closeTimerRef.current = window.setTimeout(() => setMiniCartOpen(false), 4000);
  }, [lastAddedAt, showMiniCart, shouldHideMiniCart]);

  // Handle scroll visibility
  useEffect(() => {
    if (!showMiniCart || isCartPage || count === 0) return;

    const handleScroll = () => {
      setIsScrolling(true);
      setMiniCartOpen(true);

      // Clear existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // Set timer to hide minicart after scrolling stops
      scrollTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        setMiniCartOpen(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [showMiniCart, shouldHideMiniCart, count]);

  const getTabRoute = (tabId: NonNullable<HeaderProps["activeTab"]>) => {
    switch (tabId) {
      case "purchase": return "/pdp";
      case "assign": return "/assign-warranty";
      case "history": return "/order-history";
      case "account": return "/account-data";
      default: return "/";
    }
  };

  const Tab = ({ id, label }: { id: NonNullable<HeaderProps["activeTab"]>; label: string }) => (
    <li className="relative shrink-0">
      <button
        type="button"
        className={`pb-2 border-b-2 transition-colors text-[#666666] ${
          activeTab === id ? "border-[#7198AD]" : "border-transparent hover:border-[#7198AD]/50"
        }`}
        aria-current={activeTab === id ? "page" : undefined}
        onClick={() => navigate(getTabRoute(id))}
      >
        {label}
      </button>
      {id === "assign" && !hideBadges && assignBadgeCount > 0 && (
        <span className="support--badge navigation--badge absolute top-0 -right-3 -translate-y-1/2 z-10 w-5 h-5 bg-[#DF6134] text-white text-[11px] leading-5 rounded-full text-center">
          {assignBadgeCount}
        </span>
      )}
    </li>
  );

  return (
    <header className="bg-[#F2F2F2]">
      <div className="max-w-[1260px] mx-auto px-4">
        {showTopBar && (
          <div className="py-4">
            <div className="grid grid-cols-3 items-center h-8">
              <div className="text-xs text-[#666666]">heating & cooling solutions Polska</div>
              <div className="hidden md:flex items-center justify-center gap-8 text-xs text-[#666666]">
                {topLinks.map((l) => (
                  <a key={l} href="#" className="hover:underline">
                    {l}
                  </a>
                ))}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none" aria-hidden>
                    <path d="M15.27 8.34c0 3.68-2.98 6.67-6.67 6.67S1.93 12.02 1.93 8.34 4.92 1.67 8.6 1.67s6.67 2.99 6.67 6.67Zm0 0H1.94m6.66 6.67c-1.71-1.8-2.67-4.18-2.67-6.67 0-2.49.96-4.87 2.67-6.67m0 13.34c1.71-1.8 2.67-4.18 2.67-6.67 0-2.49-.96-4.87-2.67-6.67M1.94 8.34c0-3.68 2.98-6.67 6.66-6.67" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Polska</span>
                </div>
              </div>
              {/* Right - Logout / Cart on desktop */}
              <div className="hidden md:flex items-center justify-end gap-7">
                {showUserActions && (
                  <>
                    {isLoginPage || isForgotPasswordPage || isEmailPasswordResetPage ? (
                      <button
                        onClick={() => navigate('/account-data')}
                        className="flex items-center gap-2 text-sm text-[#333333] font-medium hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Account</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm text-[#333333] font-medium hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Logout</span>
                      </button>
                    )}
                    {!shouldHideCart && (
                      <div
                        className="relative flex items-center gap-2 text-sm text-[#333333] font-medium cursor-pointer"
                        onMouseEnter={() => { if (!showMiniCart || !canHoverMiniCart || shouldHideMiniCart) return; if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; } if (scrollTimerRef.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; } setMiniCartOpen(true); }}
                        onMouseLeave={() => { if (!showMiniCart || !canHoverMiniCart || isScrolling || shouldHideMiniCart) return; closeTimerRef.current = window.setTimeout(() => setMiniCartOpen(false), 10000); }}
                        onClick={() => { if (miniCartOpen) return; navigate('/cart'); }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/cart'); } }}
                      >
                      <svg className="w-6 h-6" viewBox="0 0 33 33" fill="none" aria-hidden>
                        <path d="M3.34 3.07h2.67l3.55 16.56c.13.61.47 1.15.95 1.53.48.38 1.08.58 1.7.57h13.04c.61 0 1.2-.21 1.67-.59.48-.38.81-.92.93-1.51l2.2-9.91H7.43M12.6 28.34c0 .34-.14.67-.38.91-.24.24-.57.38-.92.38a1.29 1.29 0 0 1-.92-.38 1.3 1.3 0 0 1-.38-.91c0-.34.14-.67.38-.91.24-.24.57-.38.92-.38.35 0 .68.14.92.38.24.24.38.57.38.91Zm14.67 0c0 .34-.14.67-.38.91-.24.24-.57.38-.92.38-.35 0-.68-.14-.92-.38a1.3 1.3 0 0 1-.38-.91c0-.34.14-.67.38-.91.24-.24.57-.38.92-.38.35 0 .68.14.92.38.24.24.38.57.38.91Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Cart</span>
                      {!hideBadges && showCartBadge && count > 0 && (
  <span className="cart--badge absolute -top-2 -right-3 bg-[#DF6134] text-white text-[11px] leading-[18px] rounded-full min-w-[18px] h-[18px] text-center px-1">{count}</span>
)}

                      {showMiniCart && !shouldHideMiniCart && (
                        <div
                          className={`${isScrolling ? 'fixed top-4 right-4' : 'absolute top-full left-1/2 transform -translate-x-1/2'} mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-sm z-[100] transition-all duration-300 ${
                            miniCartOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                          }`}
                          style={{
                            filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1))',
                          }}
                          onMouseEnter={() => { if (!showMiniCart || !canHoverMiniCart || shouldHideMiniCart) return; if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; } if (scrollTimerRef.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; } setMiniCartOpen(true); }}
                          onMouseLeave={() => { if (!showMiniCart || !canHoverMiniCart || isScrolling || shouldHideMiniCart) return; closeTimerRef.current = window.setTimeout(() => setMiniCartOpen(false), 10000); }}
                        >
                          {/* White pointer arrow - only show when not scrolling */}
                          {!isScrolling && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <div className="w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-sm font-semibold text-black">Cart</div>
                              <button
                                className="text-xs text-panasonic-blue underline"
                                onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}
                              >
                                View cart
                              </button>
                            </div>
                            <div className="max-h-64 overflow-auto divide-y">
                              {items.length === 0 ? (
                                <div className="py-6 text-sm text-black/70">Your cart is empty.</div>
                              ) : (
                                items.map((it) => (
                                  <div key={it.id} className="py-3 flex gap-3 items-start">
                                    <img src={it.image} alt={it.title} className="w-12 h-12 rounded border object-cover" />
                                    <div className="flex-1">
                                      <div className="text-sm text-black font-medium">{it.title}</div>
                                      <div className="text-xs text-black/70">{it.years} {it.years === 1 ? 'Year' : 'Years'}</div>
                                      <div className="text-xs text-black/80 mt-1">{it.qty} × {priceByYears[it.years].toFixed(2)} zł</div>
                                    </div>
                                    <div className="text-sm text-black font-semibold whitespace-nowrap">{lineTotal(it).toFixed(2)} zł</div>
                                  </div>
                                ))
                              )}
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className="text-black/70">Subtotal</div>
                              <div className="text-black font-semibold">{subtotal.toFixed(2)} zł</div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <button
                                className="h-9 rounded border border-gray-300 text-sm hover:bg-gray-50"
                                onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}
                              >
                                Go to cart
                              </button>
                              <button
                                className="h-9 rounded text-sm font-semibold transition-all duration-200 bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                                onClick={(e) => { e.stopPropagation(); navigate('/payment'); }}
                              >
                                Checkout
                              </button>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden justify-self-end w-8 h-8 grid place-items-center rounded hover:bg-black/5"
                aria-label="Toggle top navigation"
                aria-expanded={mobileTopOpen}
                onClick={() => setMobileTopOpen((v) => !v)}
              >
                <svg className="w-5 h-5 text-[#666666]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {mobileTopOpen ? (
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            {mobileTopOpen && (
              <div className="md:hidden mt-2 rounded-lg border border-gray-200 bg-white shadow-sm">
                <nav className="flex flex-col py-2">
                  {topLinks.map((l) => (
                    <a key={l} href="#" className="px-4 py-2 text-xs text-[#666666] hover:bg-gray-50">
                      {l}
                    </a>
                  ))}
                  {showUserActions && (
                    <>
                      {isLoginPage || isForgotPasswordPage || isEmailPasswordResetPage ? (
                        <button
                          onClick={() => {navigate('/account-data'); setMobileTopOpen(false);}}
                          className="px-4 py-2 text-xs text-[#666666] hover:bg-gray-50 flex items-center gap-2 w-full text-left"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Account
                        </button>
                      ) : (
                        <button
                          onClick={() => {navigate('/'); setMobileTopOpen(false);}}
                          className="px-4 py-2 text-xs text-[#666666] hover:bg-gray-50 flex items-center gap-2 w-full text-left"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Logout
                        </button>
                      )}
                      {!shouldHideCart && (
                        <button
                          onClick={() => {navigate('/cart'); setMobileTopOpen(false);}}
                          className="px-4 py-2 text-xs text-[#666666] hover:bg-gray-50 flex items-center gap-2 text-left"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 33 33" fill="none" aria-hidden>
                            <path d="M3.34 3.07h2.67l3.55 16.56c.13.61.47 1.15.95 1.53.48.38 1.08.58 1.7.57h13.04c.61 0 1.2-.21 1.67-.59.48-.38.81-.92.93-1.51l2.2-9.91H7.43M12.6 28.34c0 .34-.14.67-.38.91-.24.24-.57.38-.92.38a1.29 1.29 0 0 1-.92-.38 1.3 1.3 0 0 1-.38-.91c0-.34.14-.67.38-.91.24-.24.57-.38.92-.38.35 0 .68.14.92.38.24.24.38.57.38.91Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Cart
                        </button>
                      )}
                    </>
                  )}
                  <div className="px-4 py-2 text-xs text-[#666666]">Polska</div>
                </nav>
              </div>
            )}
          </div>
        )}

        {/* Logo + Tabs centered across full width */}
        <div className="grid grid-cols-3 items-end pb-4">
          <div />
          <div className="col-start-2 justify-self-center flex flex-col items-center">
            <div className="h-[64px] flex items-center justify-center">
              <button onClick={() => navigate('/')} className="cursor-pointer flex flex-col">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc2f2e8f867424bc498dd8cb3c4e3c96b%2Fc5bdb8c9c1164ea88a1c0090a7c96223?format=webp&width=907"
                  alt="Panasonic"
                  className="h-7 w-auto mx-auto"
                  width={907}
                  height={29}
                  loading="eager"
                />
              </button>
            </div>
            <nav aria-label="Primary">
              <ul className="flex items-center gap-10 flex-nowrap whitespace-nowrap max-w-full overflow-y-visible mt-5">
                <Tab id="purchase" label="Purchase Warranty" />
                <Tab id="assign" label="Assign Warranty" />
                <Tab id="history" label="Order History" />
                <Tab id="account" label="Account" />
              </ul>
            </nav>
          </div>
          <div />
        </div>
      </div>
    </header>
  );
}
