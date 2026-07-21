/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useMemo, useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, getCategories } from "@/lib/products";


const SORTS = ["Catalog order", "Price: low to high", "Price: high to low"] as const;

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";

  const categories = ["All", ...getCategories()];
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Catalog order");

useEffect(() => {
  setCategory(searchParams.get("category") ?? "All");
}, [searchParams]);

  const visible = useMemo(() => {
    let list = products.filter(
      (p) => category === "All" || p.category === category
    );
    if (sort === "Price: low to high") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-10 border-b border-ink/10 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">
          Full catalog
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink lg:text-5xl">
          Shop the line.
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Category
            </p>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`font-display text-lg italic transition-colors ${
                      category === c ? "text-clay" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <label
              htmlFor="sort"
              className="font-mono text-xs uppercase tracking-widest text-ink-soft"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
              className="mt-3 w-full border border-ink/20 bg-bone px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-ink-soft">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visible.length === 0 && (
            <p className="py-20 text-center font-display text-xl italic text-ink-soft">
              Nothing in this category yet &mdash; check back next drop.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}