import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import PurchasePanel from "@/components/PurchasePanel";
import ProductCard from "@/components/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
     <Breadcrumb className="mb-8 font-mono text-xs uppercase tracking-widest">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink
        render=
        {
        <Link href="/shop" />
        }
        className="text-ink-soft hover:text-clay"
      >
        Shop
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink
        render={<Link href={`/shop?category=${product.category}`} />}
        className="text-ink-soft hover:text-clay"
      >
        {product.category}
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage className="text-ink">{product.name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-4/5 overflow-hidden bg-sand/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/5 overflow-hidden bg-sand/40">
            <Image
              src={product.imageHover}
              alt={`${product.name}, detail view`}
              fill
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative flex aspect-4/5 items-center justify-center bg-ink text-bone">
            <span className="font-display text-6xl italic">N&deg;{product.no}</span>
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            N&deg; {product.no} &mdash; {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl italic text-ink lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-ink-soft">
            ${product.price} &mdash; {product.colorway}
          </p>

          <p className="mt-6 max-w-md text-ink-soft">{product.description}</p>

          <div className="mt-8 border-t border-ink/10 pt-8">
            <PurchasePanel product={product} />
          </div>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Care
            </p>
            <p className="mt-2 text-sm text-ink-soft">{product.care}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-ink/10 pt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            You may also like
          </p>
          <h2 className="mt-2 font-display text-3xl italic text-ink">
            More {product.category.toLowerCase()}.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}