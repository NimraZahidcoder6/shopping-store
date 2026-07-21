"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Outerwear", label: "Outerwear" },
  { href: "/shop?category=Knitwear", label: "Knitwear" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bone/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          SHOPSPHERE 
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-clay"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/shop"
            className="hidden font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-clay md:block"
          >
            Search
          </Link>

          <Link
            href="/favourites"
            aria-label="View favourites"
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-clay"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7.5-4.7-10-9.3C.5 8.4 2.2 5 5.6 5c2 0 3.3 1 4.4 2.4C11.1 6 12.4 5 14.4 5c3.4 0 5.1 3.4 3.6 6.7C19.5 16.3 12 21 12 21z" />
            </svg>
            ({favorites.length})
          </Link>

          <Link
            href="/cart"
            className="font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-clay"
          >
            Bag ({totalItems})
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-0.75 rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-0.75 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-ink/10 bg-bone px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="border-b border-ink/5 py-3 font-mono text-xs uppercase tracking-widest text-ink-soft last:border-none"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}