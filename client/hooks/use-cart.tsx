import { createContext, useContext, useMemo, useState, ReactNode, useCallback, useEffect } from "react";

export type CartYears = 1 | 2 | 3;
export interface CartItem {
  id: string;
  title: string;
  years: CartYears;
  qty: number;
  image: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: number;
  priceByYears: Record<CartYears, number>;
  lineTotal: (item: CartItem) => number;
  subtotal: number;
  vatRate: number;
  vat: number;
  total: number;
  lastAddedAt: number | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize from sessionStorage to persist within a session; start empty by default
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? sessionStorage.getItem('cart') : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });
  const [lastAddedAt, setLastAddedAt] = useState<number | null>(null);

  const priceByYears = useMemo(() => ({ 1: 109.99, 2: 199.0, 3: 269.97 }) as Record<CartYears, number>, []);

  // Persist to sessionStorage whenever items change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') sessionStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) {
        return prev.map((it) => (it.id === item.id ? { ...it, qty: it.qty + item.qty } : it));
      }
      return [...prev, item];
    });
    setLastAddedAt(Date.now());
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((q, it) => q + it.qty, 0), [items]);
  const lineTotal = useCallback((item: CartItem) => priceByYears[item.years] * item.qty, [priceByYears]);
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + lineTotal(it), 0), [items, lineTotal]);
  const vatRate = 0.23;
  const vat = useMemo(() => subtotal * vatRate, [subtotal]);
  const total = useMemo(() => subtotal + vat, [subtotal, vat]);

  const value: CartContextValue = {
    items,
    addItem,
    updateQty,
    removeItem,
    clear,
    count,
    priceByYears,
    lineTotal,
    subtotal,
    vatRate,
    vat,
    total,
    lastAddedAt,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
