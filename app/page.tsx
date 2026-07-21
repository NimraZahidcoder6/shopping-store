import Hero from "@/components/Hero";
import CategoryTicker from "@/components/CategoryTicker";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";


export default function HomePage() {
  const featured = products.slice(0, 6);

  return (
    <>
      <Hero />
      <CategoryTicker />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
          
            <p className="font-mono text-xs uppercase tracking-widest text-clay">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl italic text-ink lg:text-4xl">
              This season&apos;s eight.
            </h2>

          </div>
          <Link
            href="/shop"
            className="hidden font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-clay md:block"
          >
            View all &rarr;
          </Link>
        
        </div>

        {/* Asymmetric catalog grid: wide/tall pieces get extra room */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={
                product.span === "tall"
                  ? "col-span-2 row-span-2 lg:col-span-1"
                  : product.span === "wide"
                    ? "col-span-2"
                    : "col-span-1"
              }
            >
              <ProductCard product={product} priority={i < 2} />
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="border-t border-ink/10 bg-bone-dim px-6 py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            About the catalog
          </p>
          <div>
            <p className="font-display text-2xl italic leading-snug text-ink lg:text-3xl">
              We number every piece because we make few of them.
            </p>
            <p className="mt-6 max-w-xl text-ink-soft">
              ShopSphere works with a handful of small mills and workshops,
              releasing one line at a time instead of chasing every season.
              Fewer pieces, made properly, cataloged so you always know
              exactly what you own and where it came from.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}