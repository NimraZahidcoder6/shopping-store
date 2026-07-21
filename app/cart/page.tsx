"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">Your bag</p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">It&apos;s empty in here.</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block border border-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-bone"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <div className="mb-10 border-b border-ink/10 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">Your bag.</h1>
      </div>

      <div className="divide-y divide-ink/10">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4 py-6">
            <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-sand/40">
              <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg text-ink">{item.name}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                    Size {item.size}
                  </p>
                </div>
                <p className="font-mono text-sm text-ink">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, -1)}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center border border-ink/20 font-mono text-ink hover:border-ink"
                  >
                    &minus;
                  </button>
                  <span className="w-5 text-center font-mono text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center border border-ink/20 font-mono text-ink hover:border-ink"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  className="font-mono text-xs uppercase tracking-widest text-ink-soft underline hover:text-clay"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-baseline justify-between border-t border-ink/10 pt-6">
        <p className="font-mono text-sm uppercase tracking-widest text-ink-soft">Total</p>
        <p className="font-display text-3xl italic text-ink">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}