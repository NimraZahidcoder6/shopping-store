"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuickView } from "@/lib/quickview-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
 const { showToast } = useToast();
  if (!quickViewProduct) return null;
  const product = quickViewProduct;

  function handleAdd() {
  if (!selectedSize) return;
  addItem(product, selectedSize, 1);
  showToast(`Added to bag — ${product.name} (${selectedSize})`);
  closeQuickView();
  setSelectedSize(null);
}

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
      onClick={closeQuickView}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto bg-bone sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-bone/80 font-mono text-lg text-ink"
        >
          &times;
        </button>

        <div className="relative aspect-[3/4] w-full bg-sand/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            N&deg; {product.no} &mdash; {product.category}
          </p>
          <h2 className="mt-2 font-display text-3xl italic text-ink">{product.name}</h2>
          <p className="mt-2 font-mono text-lg text-ink-soft">${product.price}</p>
          <p className="mt-4 text-sm text-ink-soft">{product.description}</p>

          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-widest ${
                    selectedSize === size
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/20 text-ink hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedSize}
            className="mt-6 w-full border border-ink py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:border-ink/20 disabled:text-ink-soft"
          >
            {selectedSize ? `Add to bag — ${selectedSize}` : "Select a size"}
          </button>

          <Link
            href={`/shop/${product.slug}`}
            onClick={closeQuickView}
            className="mt-4 block text-center font-mono text-xs uppercase tracking-widest text-ink-soft underline underline-offset-2 hover:text-clay"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}