"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function FavouritesPage() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">
          Favourites
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">
          Nothing saved yet.
        </h1>
        <p className="mt-3 text-ink-soft">
          Tap the heart on any product to save it here.
        </p>
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
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-10 border-b border-ink/10 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">
          {favoriteProducts.length} saved
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink lg:text-5xl">
          Your favourites.
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}