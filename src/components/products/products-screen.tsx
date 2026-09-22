"use client";

import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";
import { DeleteProductDialog } from "./delete-product-dialog";
import { ProductListSkeleton } from "./product-list-skeleton";
import { ProductFormDialog } from "./product-form-dialog";
import { ProductPagination } from "./product-pagination";
import { ProductTable } from "./product-table";

const ITEMS_PER_PAGE = 5;

export const ProductsScreen = () => {
  const { products, addedProductIds, loaded, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false }),
  );
  const locale = useLocale();
  const catalog = useTranslations("catalog");
  const formMessages = useTranslations("form");
  const toastMessages = useTranslations("toast");
  const pathname = usePathname();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const pageCount = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const visibleProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (loaded && page !== currentPage) void setPage(currentPage);
  }, [loaded, page, currentPage, setPage]);

  const restoreFocus = () => {
    requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
      else addButtonRef.current?.focus();
    });
  };

  const closeForm = () => {
    setDialogOpen(false);
    restoreFocus();
  };

  const openForm = (product?: Product) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setEditingProduct(product ?? null);
    setDialogOpen(true);
  };

  const saveProduct = (product: Product) => {
    if (editingProduct) {
      updateProduct(product);
      toast.success(toastMessages("updated"));
    } else {
      addProduct(product);
      void setPage(1);
      toast.success(toastMessages("added"));
    }
    closeForm();
  };

  const openDelete = (product: Product) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDeleteTarget(product);
  };

  const closeDelete = () => {
    setDeleteTarget(null);
    restoreFocus();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success(toastMessages("deleted"));
    closeDelete();
  };

  return (
    <main className="mx-auto w-full max-w-[1272px] px-4 py-6 sm:px-6 lg:px-4 lg:pb-12 lg:pt-[50px]">
      <header className="mb-4 flex items-center justify-between gap-2 lg:mb-6">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-xl font-semibold leading-7">{catalog("title")}</h1>
          <p className="text-sm leading-5 text-muted-foreground">
            {loaded ? catalog("count", { count: products.length }) : catalog("loading")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={catalog("switchLanguage")}
            onClick={() =>
              router.replace(
                { pathname, query: { page: String(currentPage) } },
                { locale: locale === "pl" ? "en" : "pl" },
              )
            }
            className="h-9 rounded-full px-3 font-normal"
          >
            {locale === "pl" ? "EN" : "PL"}
          </Button>
          <Button
            ref={addButtonRef}
            type="button"
            disabled={!loaded}
            onClick={() => openForm()}
            className="h-9 shrink-0 gap-1.5 rounded-full bg-blue-600 px-4 font-normal text-white hover:bg-blue-700"
          >
            <Plus className="size-4" aria-hidden="true" />
            {formMessages("addProduct")}
          </Button>
        </div>
      </header>

      <div
        aria-busy={!loaded}
        className="lg:overflow-hidden lg:rounded-lg lg:border lg:border-border lg:bg-white lg:shadow-xs"
      >
        {loaded ? (
          <>
            <ProductTable
              products={visibleProducts}
              addedProductIds={addedProductIds}
              onEdit={openForm}
              onDelete={openDelete}
            />
            <div className="grid gap-2 lg:hidden">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  canManage={addedProductIds.has(product.id)}
                  onEdit={openForm}
                  onDelete={openDelete}
                />
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
        <ProductFormDialog
          key={editingProduct?.id ?? "new"}
          product={editingProduct ?? undefined}
          onClose={closeForm}
          onSave={saveProduct}
        />
      )}
      {deleteTarget && (
        <DeleteProductDialog
          product={deleteTarget}
          onClose={closeDelete}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
};
