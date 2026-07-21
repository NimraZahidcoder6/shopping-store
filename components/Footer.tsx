import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <p className="font-display text-2xl">SHOPSPHERE</p>
          <p className="mt-4 max-w-xs text-sm text-bone/60">
            Small-batch clothing, numbered and catalogued. Made to be worn
            for a decade, not a season.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50">
            Shop
          </p>
          <ul className="mt-4 space-y-2 text-sm text-bone/80">
            <li><Link href="/shop?category=Outerwear" className="hover:text-blue-500">Outerwear</Link></li>
            <li><Link href="/shop?category=Knitwear" className="hover:text-blue-500">Knitwear</Link></li>
            <li><Link href="/shop?category=Denim" className="hover:text-blue-500">Denim</Link></li>
            <li><Link href="/shop?category=Accessories" className="hover:text-blue-500">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50">
            Info
          </p>
          <ul className="mt-4 space-y-2 text-sm text-bone/80">
            <li><Link href="/#about" className="hover:text-blue-500">About</Link></li>
            <li><Link href="#" className="hover:text-blue-500">Shipping &amp; Returns</Link></li>
            <li><Link href="#" className="hover:text-blue-500">Size Guide</Link></li>
            <li><Link href="#" className="hover:text-blue-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50">
            Join the list
          </p>
          <form className="mt-4 flex border-b border-bone/30 focus-within:border-clay">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent py-2 text-sm text-bone placeholder:text-bone/40 focus:outline-none"
            />
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-widest text-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-bone/10 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-bone/40 lg:px-10">
        <span>N&deg; 2026</span>
        <span>&copy; ShopSphere. All rights reserved.</span>
      </div>
    </footer>
  );
}