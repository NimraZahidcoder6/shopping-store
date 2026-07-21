"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useFavorites } from "@/lib/favorites-context";
import { useQuickView } from "@/lib/quickview-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openQuickView } = useQuickView();
  const { items, addItem, decrementItem } = useCart();
  const { showToast } = useToast();

  const [showSizePicker, setShowSizePicker] = useState(false);

  const favorited = isFavorite(product.id);
  const cartEntry = items.find((i) => i.id === product.id);
  const quantityInCart = cartEntry?.quantity ?? 0;

  function stop(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFavoriteClick(e: React.MouseEvent) {
    stop(e);
    toggleFavorite(product.id);
  }

  function handleQuickViewClick(e: React.MouseEvent) {
    stop(e);
    setShowSizePicker(false);
    openQuickView(product);
  }

 
  function handleCartIconClick(e: React.MouseEvent) {
    stop(e);
    setShowSizePicker((v) => !v);
  }

  function handlePickSize(e: React.MouseEvent, size: string) {
    stop(e);
    addItem(product, size, 1);
    showToast(`Added to bag — ${product.name} (${size})`);
    setShowSizePicker(false);
  }

  function handleIncrement(e: React.MouseEvent) {
    stop(e);
    if (!cartEntry) return;
    addItem(product, cartEntry.size, 1);
    showToast(`Added to bag — ${product.name}`);
  }

  function handleDecrement(e: React.MouseEvent) {
    stop(e);
    if (!cartEntry) return;
    decrementItem(product.id, cartEntry.size);
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block cursor-pointer"  onMouseLeave={() => setShowSizePicker(false)}>
      <div className="relative aspect-3/4 w-full overflow-hidden bg-sand/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="product-image-primary absolute inset-0 object-cover"
        />
        <Image
          src={product.imageHover}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="product-image-hover absolute inset-0 object-cover opacity-0"
        />
        <span className="absolute left-3 top-3 z-10 font-mono text-[11px] tracking-widest text-bone mix-blend-difference">
          N&deg; {product.no}
        </span>

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favorited}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center bg-bone/85 transition-transform hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={favorited ? "#a34e3a" : "none"}
            stroke="#a34e3a"
            strokeWidth="1.5"
          >
            <path d="M12 21s-7.5-4.7-10-9.3C.5 8.4 2.2 5 5.6 5c2 0 3.3 1 4.4 2.4C11.1 6 12.4 5 14.4 5c3.4 0 5.1 3.4 3.6 6.7C19.5 16.3 12 21 12 21z" />
          </svg>
        </button>

       
        {showSizePicker && (
          <div
            className="absolute inset-x-3 bottom-14 z-20 flex flex-wrap gap-1.5 bg-bone p-3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="w-full font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              Select size
            </p>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handlePickSize(e, size)}
                className="cursor-pointer border border-ink/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink hover:border-ink hover:bg-ink hover:text-bone"
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-1.5 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1 bg-bone/90 py-1.5 font-mono text-[9px] uppercase tracking-widest text-ink hover:bg-bone"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick view
          </button>

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={handleCartIconClick}
              aria-label="Choose size and add to cart"
              aria-expanded={showSizePicker}
              className="flex cursor-pointer items-center justify-center bg-ink px-3 py-1.5 text-bone hover:bg-ink/90"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h12l-1 13H7L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-ink px-1 py-1 text-bone">
              <button
                type="button"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                className="flex h-5 w-5 cursor-pointer items-center justify-center font-mono text-xs"
              >
                &minus;
              </button>
              <span className="w-4 text-center font-mono text-xs">{quantityInCart}</span>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="flex h-5 w-5 cursor-pointer items-center justify-center font-mono text-xs"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg leading-tight text-ink">
            {product.name}
          </p>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
            {product.colorway}
          </p>
        </div>
        <p className="font-mono text-sm text-ink-soft">${product.price}</p>
      </div>
    </Link>
  );
}