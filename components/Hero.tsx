import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:px-10 lg:pb-0 lg:pt-0">
        <div className="relative z-10 lg:pr-8">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            Collection N&deg; 08 &mdash; Autumn Line
          </p>
          <h1 className="mt-4 font-display text-[13vw] italic leading-[0.95] text-ink lg:text-[5.5vw]">
            Dressed for the
            <br />
            the long season. 
          </h1>
          <p className="mt-6 max-w-md text-ink-soft">
            Eight pieces, numbered and catalogued. Wool, silk and raw denim,
            cut to be worn until they&apos;re earned, not just bought.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 border border-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            View the catalog
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-[88vh] mb-6 mt-8">
          <Image
            src="/hero.jpg"
            alt="Model wearing the ShopSphere autumn line wool overcoat"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}