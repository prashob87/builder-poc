import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import SupportContact from "@/components/SupportContact";
import { useCart } from "@/hooks/use-cart";

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, priceByYears, lineTotal, subtotal, vatRate, vat, total } = useCart();
  const hasAllTypes = [1, 2, 3].every((y) => items.some((it) => it.years === y));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showUserActions activeTab={"purchase"} assignBadgeCount={0} cartBadgeCount={items.reduce((q, it) => q + it.qty, 0)} />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 md:px-6 lg:px-0 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-black/80 mb-8">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12l9-9 9 9v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none"><path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Cart</span>
        </div>

        <h1 className="text-black text-3xl md:text-4xl font-bold font-[Arial] mb-8">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-12">
          {/* Items list */}
          <div className="space-y-10">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[88px_minmax(0,1fr)_100px] md:grid-cols-[110px_minmax(0,1fr)_120px] items-start gap-6">
                <div className="w-[88px] md:w-[110px]">
                  <img src={item.image} width={110} height={140} alt={`${item.years} Year plan`} className="w-full h-auto rounded border" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-black text-sm md:text-base font-bold">{item.title}</div>
                  <div className="text-black/70 text-sm">{item.years} {item.years === 1 ? "Year" : "Years"}</div>
                  <button onClick={() => removeItem(item.id)} className="text-black text-sm underline w-fit mt-1 hover:opacity-80">
                    Delete
                  </button>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <label className="text-black/70 text-xs">Quantity</label>
                  <select
                    className="h-8 w-[72px] border rounded px-2 bg-white"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-black/70">Your cart is empty.</div>
            )}
            {!hasAllTypes && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/pdp')}
                  className="h-11 rounded-lg border border-gray-300 px-4 text-sm bg-white"
                >
                  Add additional Warranty
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-8 w-full">
            <div className="bg-[#F5F5F5] rounded-lg p-6 border border-[#E5E5E5] shadow-sm">
              <h2 className="text-black text-lg font-bold mb-4">Total cost summary</h2>
              <div className="space-y-2 text-sm">
                {items.map((it) => (
                  <div key={it.id} className="flex items-start justify-between gap-4">
                    <div>
                      <div> {it.qty}x Warranty Extension ({it.years} {it.years === 1 ? "Year" : "Years"})</div>
                      {it.years === 1 && (
                        <div className="text-black/50 text-xs">per item: {priceByYears[1].toFixed(2)} zł</div>
                      )}
                    </div>
                    <div>{lineTotal(it).toFixed(2)} zł</div>
                  </div>
                ))}

              <div className="flex items-center justify-between mt-4">
                <div className="text-black/70">Subtotal</div>
                <div>{subtotal.toFixed(2)} zł</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-black/70">VAT ({(vatRate * 100).toFixed(0)}%)</div>
                <div>{vat.toFixed(2)} zł</div>
              </div>
              <div className="flex items-center justify-between font-bold mt-1">
                <div>Total cost</div>
                <div>{total.toFixed(2)} zł</div>
              </div>
              </div>

              <button
                className={`mt-6 w-full h-11 rounded-lg font-bold text-[17px] transition-all duration-200 ${
                  items.length === 0
                    ? "bg-[rgba(249,203,58,0.56)] text-[rgba(0,0,0,0.5)] cursor-not-allowed"
                    : "bg-[#F9CB3A] text-black cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border hover:border-[#F2F2F2] hover:shadow-[0_4px_6.3px_2px_rgba(0,0,0,0.15)] active:shadow-[1px_1px_4.2px_1px_rgba(0,0,0,0.15)_inset] active:border-[#F2F2F2]"
                }`}
                disabled={items.length === 0}
                onClick={() => navigate('/payment')}
              >
                Proceed to payment provider
              </button>

              {/* Contact card */}
              <SupportContact phone="+49 12334 123124" className="mt-6 mb-0" size="sm" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
