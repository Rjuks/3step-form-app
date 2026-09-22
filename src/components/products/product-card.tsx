import { CATEGORY_LABELS } from "@/constants/consts";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/price";

import { ProductStatus } from "./product-status";

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  return (
    <article className="min-w-0 rounded-[12px] border border-border bg-white p-3">
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0">
          <h2 className="truncate text-base font-medium">{product.name}</h2>
          <p className="mt-1 truncate text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <ProductStatus available={product.isAvailable} />
      </div>

      <dl className="mt-2 grid grid-cols-3 gap-1 rounded-[9px] bg-muted p-3 text-xs">
        <div className="min-w-0">
          <dt className="text-muted-foreground">Kategoria</dt>
          <dd className="mt-1 text-sm break-words">{CATEGORY_LABELS[product.category]}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">Cena brutto</dt>
          <dd className="mt-1 text-sm font-medium break-words">
            {formatPrice(product.grossPriceCents, product.currency)}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">Magazyn</dt>
          <dd className="mt-1 text-sm break-words">{product.stockQuantity ?? "—"}</dd>
        </div>
      </dl>
    </article>
  );
};
