import { Suspense } from "react";
import ShopCatalog from "@/components/ShopCatalog";

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopCatalog />
    </Suspense>
  );
}