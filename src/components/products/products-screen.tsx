"use client";

import { Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ITEMS_PER_PAGE } from "@/constants/consts";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product";
import { formatProductCount } from "@/utils/product-count";

import { ProductCard } from "./product-card";
import { CreateProductDialog } from "./create-product-dialog";
import { ProductListSkeleton } from "./product-list-skeleton";
import { ProductPagination } from "./product-pagination";
import { ProductTable } from "./product-table";

export const ProductsScreen = () => {
  const { products, loaded, addProduct } = useProducts();
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false }),
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const pageCount = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const visibleProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (loaded && page !== currentPage) void setPage(currentPage);
  }, [loaded, page, currentPage, setPage]);

  const saveProduct = (product: Product) => {
    addProduct(product);
    void setPage(1);
    setDialogOpen(false);
    toast.success("Produkt został dodany");
  };

  return (
    <main className="mx-auto w-full max-w-[1272px] px-4 py-6 sm:px-6 lg:px-4 lg:pb-12 lg:pt-[50px]">
      <header className="mb-4 flex items-center justify-between gap-2 lg:mb-6">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-xl font-semibold leading-7">Produkty</h1>
          <p className="text-sm leading-5 text-muted-foreground">
            {loaded
              ? `${formatProductCount(products.length)} w katalogu`
              : "Ładowanie produktów..."}
          </p>
        </div>
        <Button
          type="button"
          disabled={!loaded}
          onClick={() => setDialogOpen(true)}
          className="h-9 shrink-0 gap-1.5 rounded-full bg-blue-600 px-4 font-normal text-white hover:bg-blue-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          Dodaj produkt
        </Button>
      </header>

      <div
        aria-busy={!loaded}
        className="lg:overflow-hidden lg:rounded-lg lg:border lg:border-border lg:bg-white lg:shadow-xs"
      >
        {loaded ? (
          <>
            <ProductTable products={visibleProducts} />
            <div className="grid gap-2 lg:hidden">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ProductPagination
              page={currentPage}
              pageCount={pageCount}
              productCount={products.length}
              onPageChange={(nextPage) => void setPage(nextPage)}
            />
          </>
        ) : (
          <ProductListSkeleton count={ITEMS_PER_PAGE} />
        )}
      </div>

      {dialogOpen && (
        <CreateProductDialog onClose={() => setDialogOpen(false)} onSave={saveProduct} />
      )}
    </main>
  );
};
