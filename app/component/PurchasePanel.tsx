"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";


const SIZE_CHART = [
  { size: "XS", chest: "32-34", waist: "26-28", length: "26" },
  { size: "S", chest: "35-37", waist: "29-31", length: "27" },
  { size: "M", chest: "38-40", waist: "32-34", length: "28" },
  { size: "L", chest: "41-43", waist: "35-37", length: "29" },
  { size: "XL", chest: "44-46", waist: "38-40", length: "30" },
];

export default function PurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const subtotal = product.price * quantity;

function handleAdd() {
  if (!selected) return;
  addItem(product, selected, quantity);

  setAdded(true);
  window.setTimeout(() => setAdded(false), 2500);
}

  function changeQuantity(delta: number) {
    setQuantity((q) => Math.max(1, q + delta));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Size</p>
        <button
          type="button"
          onClick={() => setShowSizeGuide(true)}
          className="cursor-pointer font-mono text-xs uppercase tracking-widest text-clay underline underline-offset-2"
        >
          Size guide
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={selected === size}
            onClick={() => {
              setSelected(size);
              setAdded(false);
            }}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              selected === size
                ? "border-ink bg-ink text-bone"
                : "border-ink/20 text-ink hover:border-ink"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Quantity</p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => changeQuantity(-1)}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-ink/20 font-mono text-lg text-ink hover:border-ink"
          >
            &minus;
          </button>
          <span className="w-6 text-center font-mono text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => changeQuantity(1)}
            aria-label="Increase quantity"
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-ink/20 font-mono text-lg text-ink hover:border-ink"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Subtotal</p>
        <p className="font-mono text-lg text-ink">${subtotal.toFixed(2)}</p>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!selected}
        className="mt-4 w-full cursor-pointer border border-ink py-4 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink-soft disabled:hover:bg-transparent disabled:hover:text-ink-soft"
      >
        {added ? "Added to bag" : selected ? `Add to bag — ${selected} × ${quantity}` : "Select a size"}
      </button>

      {showSizeGuide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative w-full max-w-lg bg-bone p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              aria-label="Close size guide"
              className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center font-mono text-lg text-ink"
            >
              &times;
            </button>

            <p className="font-mono text-xs uppercase tracking-widest text-clay">
              Size guide
            </p>
            <h3 className="mt-1 font-display text-2xl italic text-ink">
              Find your fit.
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              All measurements in inches. Check it out for your perfect size.
            </p>

            <table className="mt-5 w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-ink/20 text-left uppercase tracking-widest text-ink-soft">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest</th>
                  <th className="py-2">Waist</th>
                  <th className="py-2">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-b border-ink/10">
                    <td className="py-2 text-ink">{row.size}</td>
                    <td className="py-2 text-ink-soft">{row.chest}</td>
                    <td className="py-2 text-ink-soft">{row.waist}</td>
                    <td className="py-2 text-ink-soft">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
